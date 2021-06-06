import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, Input, Overlay, NumberPicker} from '@alifd/next';
import log from "../../../../components/Log";

import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import PopWithdrawVO from "./PopWithdrawVO";

const closePopWithdrawDialog=()=>{
    PopWithdrawVO.setShow(false);
};

const withdrawAmountChange = (value) => {
    PopWithdrawVO.setWithdrawAmount(value);
};

const opaPopWithdraw = ()=>{
    log.debug(`withdraw...`);
    PopWithdrawVO.triggerSubmitEvent();
};

@observer
class PopWithdraw extends Component {
    render() {
        return (
            <Overlay visible={PopWithdrawVO.show}
                // safeNode={() => this.btn}
                     align="cc cc"
                     hasMask
                     disableScroll className={'overlay_container opa_pop_windows opa_withdraw_pop_windows'}>
                <div>
                    <div className={'item title'}>{PopWithdrawVO.title}</div>
                    <div className={'item'}>My Wallet Address</div>
                    <div className={'item'}>
                        <Input
                            disabled
                            aria-label="disabled"
                            className={'f_input'}
                            value={currentAccountStorage.account}
                        />
                    </div>

                    <div className={'item'}>{PopWithdrawVO.assetDes}</div>
                    <div className={'item'}>
                        <NumberPicker
                            innerAfter={PopWithdrawVO.assetUnit}
                            className={'f_input f_input_long'}
                            value={PopWithdrawVO.withdrawAmount}
                            step={1}
                            precision={18}
                            min={0}
                            max={PopWithdrawVO.maxWithdrawShowNumber}
                            onChange={withdrawAmountChange}
                            hasTrigger={false}
                        />
                    </div>
                    <div className={'item'}>Maximum Available: <span className={'asset_value'}>{PopWithdrawVO.maxWithdrawShow}</span> <span className={'asset_unit'}>{PopWithdrawVO.assetUnit}</span></div>

                    <div className={'item sub_btn_box'}>
                        <Button type="primary" size="large" onClick={closePopWithdrawDialog} className="sub_btn cancel">CANCEL</Button>
                        <Button type="primary" size="large" onClick={opaPopWithdraw} disabled={!PopWithdrawVO.submitEnable} className="sub_btn confirm">CONFIRM</Button>
                    </div>
                </div>
            </Overlay>
        );
    }
};

export default PopWithdraw;
