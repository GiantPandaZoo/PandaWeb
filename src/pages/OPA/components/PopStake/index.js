import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, Input, Overlay, NumberPicker} from '@alifd/next';
import log from "../../../../components/Log";

import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import PopStakeVO from "./PopStakeVO";
import ConditionDisplay from "../../../../components/ConditionDisplay";


const closePopStakeDialog=()=>{
    PopStakeVO.setShow(false);
};

const stakeAmountChange = (value) => {
    PopStakeVO.setStakeAmount(value);
};

const stake = ()=>{
    log.debug(`stake...`);
    PopStakeVO.triggerSubmitEvent();
};

@observer
class PopStake extends Component {
    render() {
        return (
            <Overlay visible={PopStakeVO.show}
                // safeNode={() => this.btn}
                     align="cc cc"
                     hasMask
                     disableScroll className={'overlay_container opa_pop_windows opa_stake_pop_windows'}>
                <div>
                    <div className={'item title'}>{PopStakeVO.title}</div>
                    <div className={'item'}>My Wallet Address</div>
                    <div className={'item'}>
                        <Input
                            disabled
                            aria-label="disabled"
                            className={'f_input'}
                            value={currentAccountStorage.account}
                        />
                    </div>

                    <div className={'item'}>Stake</div>
                    <div className={'item'}>
                        <NumberPicker
                            innerAfter={PopStakeVO.assetUnit}
                            className={'f_input f_input_long'}
                            value={PopStakeVO.stakeAmount}
                            step={1}
                            precision={18}
                            min={0}
                            max={PopStakeVO.maxStakeShowNumber}
                            onChange={stakeAmountChange}
                            hasTrigger={false}
                        />
                    </div>
                    <div className={'item'}>Maximum Available: <span className={'asset_value'}>{PopStakeVO.maxStakeShow}</span> <span className={'asset_unit'}>{PopStakeVO.assetUnit}</span></div>

                    <div className={'item sub_btn_box'}>
                        <Button type="primary" size="large" onClick={closePopStakeDialog} className="sub_btn cancel">CANCEL</Button>
                        <Button type="primary" size="large" onClick={stake} disabled={!PopStakeVO.submitEnable} className="sub_btn confirm">CONFIRM</Button>
                    </div>

                    <ConditionDisplay display={PopStakeVO.providerLiquidityUrl}>
                        <div className={'item sub_btn_box sub_box_pl'}>
                            <a href={PopStakeVO.providerLiquidityUrl} target={'_blank'} className={'pl_btn'}>PROVIDE LIQUIDITY</a>
                        </div>
                    </ConditionDisplay>
                </div>
            </Overlay>
        );
    }
};

export default PopStake;
