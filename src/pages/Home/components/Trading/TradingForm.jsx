import React, { Component } from 'react';

import './index.scss';
import {Button, Input, NumberPicker, ResponsiveGrid, Select, Radio, ConfigProvider} from '@alifd/next';
import ConnectWallet from '../../../../components/ConnectWallet/ConnectWallet';
import IfConnectedWallet from '../../../../components/ConnectWallet/IfConnectedWallet';
import ConditionDisplay from '../../../../components/ConditionDisplay';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import {autorun} from 'mobx'
import OptionTradingDAO from './OptionTradingDAO';
import OptionTradingDTOList from './OptionTradingDTOList';
import OptionTradingVO from './OptionTradingVO';
import WebThreeLoadEvent from '../../../../components/Web3/WebThreeLoadEvent';
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import BigNumber from 'bignumber.js'
import log from '../../../../components/Log';
import AssetApprove from '../../../../components/AssetApprove';
import CountdownTimer from "../../../../components/Countdown/CountdownTimer";
import DataRefreshTimer from "../../../../components/DataRefreshTimer";
import {NextComponentLocaleConfig} from "../../../../components";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";

const { Cell } = ResponsiveGrid;
const RadioGroup = Radio.Group;

const buy = () => {
    DialogBoxVO.confirm();

    let allowance=new BigNumber(AssetApprove.getContractAllowance(OptionTradingVO.poolContractAddress));
    let optionCosts=new BigNumber(OptionTradingVO.optionCosts);
    log.debug(allowance.toFormat());
    log.debug(optionCosts.toFormat());

    let isNeedApprove=allowance.lt(optionCosts);
    log.debug(`isNeedApprove => ${isNeedApprove}`);
    if(isNeedApprove){
        OptionTradingDAO.approve();
    }else{
        OptionTradingDAO.buy();
    }
};

const optionRoundSelect = (value) => {
    OptionTradingVO.setTradingEnable(false);

    OptionTradingVO.setOptionDurationTxt(value);
    OptionTradingVO.refresh();

    OptionTradingDAO.loadOptionCosts(OptionTradingVO);
};

const optionAmountChange = (value) => {
    OptionTradingVO.setOptionAmount(value);
    if(value){
        OptionTradingDAO.loadOptionCosts(OptionTradingVO);
    }else{
        OptionTradingVO.setOptionCosts(0);
    }
};

const optionTypeSwitch=(value)=>{
    log.debug(`optionType=>${value}`);
    OptionTradingDTOList.setOptionType(value);
};

@observer
class TradingForm extends Component {
    componentDidMount() {
        autorun(() => {
            if(OptionTradingDTOList.coinName && WebThreeLoadEvent.isLoaded){
                OptionTradingDAO.loadOptionPools();
            }
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                AssetApprove.getAllowance();
            }
        });

        autorun(() => {
            if(OptionTradingVO.tradingEnable && CountdownTimer.round){
                OptionTradingVO.refreshExpiryDate();
            }
        });

        autorun(() => {
            if(DataRefreshTimer.round){
                if(OptionTradingDTOList.coinName && WebThreeLoadEvent.isLoaded && !OptionTradingVO.tradingEnable){
                    OptionTradingDAO.loadOptionPools();
                }

                if(OptionTradingDTOList.coinName && WebThreeLoadEvent.isLoaded && OptionTradingVO.tradingEnable){
                    OptionTradingDAO.refreshStrikePrice();
                }
            }
        });
    }

    render() {
        return (
            <ResponsiveGrid gap={20} className={'option_form'} columns={44}>
                <Cell className="grid-9 section_item" colSpan={9}>
                    <span className={'f_title'}>{intl.get('page.home.trading.title.optionType')}</span>
                    <div className={'f_input_box'}>
                        <RadioGroup shape="button" size="large" value={OptionTradingDTOList.optionType} onChange={optionTypeSwitch} >
                            <Radio id="J_optionTypeCall" value="callPoolContract">{intl.get('page.home.trading.optionType.callPoolContract')}</Radio>
                            <Radio id="J_optionTypePut" value="putPoolContract">{intl.get('page.home.trading.optionType.putPoolContract')}</Radio>
                        </RadioGroup>
                    </div>
                </Cell>
                <Cell className="grid-10 section_item" colSpan={10}>
                    <span className={'f_title'}>{intl.get('page.home.trading.title.optionDuration')}</span>
                    <div className={'f_input_box'}>
                        <ConfigProvider locale={NextComponentLocaleConfig}>
                            <Select
                                id="J_optionCycle"
                                defaultValue={'-'}
                                value={OptionTradingVO.getDefaultOptionDuration()}
                                className={'f_input f_input_longer'}
                                dataSource={OptionTradingVO.optionRounds}
                                onChange={optionRoundSelect}
                            />
                        </ConfigProvider>
                    </div>
                    <div className={'f_tips'}>{intl.get('page.home.trading.tips.expiryDat')}<span className={'bolder'}>{OptionTradingVO.expiryDateTxt}</span></div>
                </Cell>
                <Cell className="grid-9 section_item" colSpan={9}>
                    <span className={'f_title'}>{intl.get('page.home.trading.title.optionAmount')}</span>
                    <div className={'f_input_box'}>
                        <NumberPicker
                            innerAfter={OptionTradingVO.coinName}
                            className={'f_input f_input_long'}
                            value={OptionTradingVO.optionAmount}
                            step={1}
                            precision={18}
                            min={0}
                            max={OptionTradingVO.optionAmountMaxFloat}
                            onChange={optionAmountChange}
                            hasTrigger={false}
                        />
                    </div>
                    <div className={'f_tips'}>{intl.get('page.home.trading.tips.optionAmount')}<span className={'bolder'}>{OptionTradingVO.optionAmountMaxTxt}</span></div>
                </Cell>
                <Cell className="grid-8 section_item" colSpan={8}>
                    <span className={'f_title'}>{intl.get('page.home.trading.title.strikePrice')}</span>
                    <div className={'f_input_box'}>
                        <Input
                            disabled
                            aria-label="disabled"
                            innerAfter="USD"
                            className={'f_input'}
                            value={OptionTradingVO.strikePriceTxt}
                        />
                    </div>
                </Cell>
                <Cell className="grid-8 section_item" colSpan={8}>
                    <span className={'f_title'}>{intl.get('page.home.trading.title.optionCosts')}</span>
                    <div className={'f_input_box'}>
                        <Input
                            disabled
                            aria-label="disabled"
                            innerAfter="USD"
                            className={'f_input'}
                            value={OptionTradingVO.optionCostsTxt}
                        />
                    </div>
                </Cell>

                <Cell className="grid-44 section_item f_submit_box" colSpan={44}>
                    <ConnectWallet />
                    <IfConnectedWallet>
                        <div className={'sub_btn_box'}>
                            <Button type="primary" size="large" onClick={buy} className="sub_btn sub_btn_long" disabled={!OptionTradingVO.tradingEnable || !AssetApprove.already}>
                                {intl.get('page.home.trading.buy')}
                            </Button>
                            <ConditionDisplay display={OptionTradingVO.tradingEnable}>
                                <div className={'buy_tips'}>
                                    {intl.get('page.home.trading.tips.buy1')}
                                    <span className={'bolder'}>{OptionTradingVO.optionCostsTxt} USDT</span>
                                    {intl.get('page.home.trading.tips.buy2')}
                                </div>
                            </ConditionDisplay>
                        </div>
                    </IfConnectedWallet>
                </Cell>
            </ResponsiveGrid>
        );
    }
}

export default TradingForm;
