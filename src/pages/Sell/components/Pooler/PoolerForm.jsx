import React, { Component } from 'react';

import './index.scss';
import {Button, Input, NumberPicker, ResponsiveGrid, Select, Radio} from '@alifd/next';
import ConnectWallet from '../../../../components/ConnectWallet/ConnectWallet';
import IfConnectedWallet from '../../../../components/ConnectWallet/IfConnectedWallet';
import ConditionDisplay from '../../../../components/ConditionDisplay';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';

import PoolerVO from './PoolerVO';
import PoolerDAO from './PoolerDAO';
import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import log from '../../../../components/Log';
import AssetApprove from "../../../../components/AssetApprove";
import AssetBalance from "../../../../components/AssetBalance";
import CurrentChainStorage from "../../../../components/Web3/CurrentChainStorage";

const { Cell } = ResponsiveGrid;
const RadioGroup = Radio.Group;

const optionTypeSwitch=(value)=>{
    log.debug(`optionType=>${value}`);
    PoolerVO.setOptionType(value);
};

const optionAmountChange = (value) => {
    PoolerVO.setQuantity(value);
};

const deposit = () => {
    PoolerDAO.checkAllowanceBeforeDeposit();
};

@observer
class PoolerForm extends Component {
    componentDidMount() {
        autorun(() => {
            if(PoolerVO.coinName && WebThreeLoadEvent.isLoaded && currentAccountStorage.account && AssetBalance.already){
                PoolerDAO.loadBalance();
            }
        });

        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                AssetApprove.getAllowance("Sell");
            }
        });
    }

    render() {
        return (
            <ResponsiveGrid gap={20} className={'pooler_form'} columns={11}>
                <Cell className="grid-5 section_item" colSpan={5}>
                    <span className={'f_title'}>{intl.get('page.sell.pooler.title.optionType')}</span>
                    <div className={'f_input_box'}>
                        <RadioGroup shape="button" size="large" value={PoolerVO.optionType} onChange={optionTypeSwitch}>
                            <Radio id="J_optionTypeCall" value="callPoolContract">{intl.get('page.sell.pooler.optionType.callPoolContract')}</Radio>
                            <Radio id="J_optionTypePut" value="putPoolContract">{intl.get('page.sell.pooler.optionType.putPoolContract')}</Radio>
                        </RadioGroup>
                    </div>
                </Cell>
                <Cell className="grid-4 section_item" colSpan={6}>
                    <span className={'f_title'}>{intl.get('page.sell.pooler.title.quantity')}</span>
                    <div className={'f_input_box'}>
                        <NumberPicker
                            innerAfter={PoolerVO.depositCoinName}
                            className={'f_input f_input_long'}
                            value={PoolerVO.quantity}
                            step={1}
                            precision={18}
                            min={0}
                            max={PoolerVO.balanceOfFloat}
                            onChange={optionAmountChange}
                            hasTrigger={false}
                        />
                    </div>
                    <IfConnectedWallet>
                        <ConditionDisplay display={PoolerVO.getBalanceSuccess}>
                            <div className={'f_tips'}>{intl.get('page.sell.pooler.tips.quantity')}<span className={'bolder'}>{PoolerVO.balanceOfTxt} {PoolerVO.depositCoinName}</span></div>
                        </ConditionDisplay>
                    </IfConnectedWallet>
                </Cell>

                <Cell className="grid-11 section_item f_submit_box" colSpan={11}>
                    <ConnectWallet />
                    <IfConnectedWallet>
                        <div className={'sub_btn_box'}>
                            <Button type="primary" size="large" onClick={deposit} className="sub_btn sub_btn_long" disabled={!PoolerVO.depositEnable}>
                                {intl.get('page.sell.pooler.deposit')}
                            </Button>
                            <ConditionDisplay display={PoolerVO.depositEnable}>
                                <div className={'deposit_tips'}>
                                    {intl.get('page.sell.pooler.tips.deposit1')}
                                    <span className={'bolder'}>{PoolerVO.quantity} {PoolerVO.depositCoinName}</span>
                                    {intl.get('page.sell.pooler.tips.deposit2')}
                                </div>
                            </ConditionDisplay>
                        </div>
                    </IfConnectedWallet>
                </Cell>
            </ResponsiveGrid>
        );
    }
}

export default PoolerForm;
