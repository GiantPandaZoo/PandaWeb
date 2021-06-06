import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, Input, Overlay, NumberPicker} from '@alifd/next';
import log from "../../../../components/Log";

import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import PopClaimVO from "./PopClaimVO";

const closePopClaimDialog=()=>{
    PopClaimVO.setShow(false);
};

const stakeRewardsClaim = ()=>{
    log.debug(`claim...`);
    PopClaimVO.triggerSubmitEvent();
};

@observer
class PopClaim extends Component {
    render() {
        return (
            <Overlay visible={PopClaimVO.show}
                // safeNode={() => this.btn}
                     align="cc cc"
                     hasMask
                     disableScroll className={'overlay_container opa_pop_windows opa_claim_pop_windows'}>
                <div>
                    <div className={'item title'}>{PopClaimVO.title}</div>
                    <div className={'item'}>My Wallet Address</div>
                    <div className={'item'}>
                        <Input
                            disabled
                            aria-label="disabled"
                            className={'f_input'}
                            value={currentAccountStorage.account}
                        />
                    </div>

                    <div className={'item'}>{PopClaimVO.rewardsFrom}</div>
                    <div className={'item rewards_box'}>
                        <span className={'asset_value'}>{PopClaimVO.rewardsShow}</span>
                        <span className={'asset_unit'}>OPA</span>
                    </div>

                    <div className={'item sub_btn_box'}>
                        <Button type="primary" size="large" onClick={closePopClaimDialog} className="sub_btn cancel">CANCEL</Button>
                        <Button type="primary" size="large" onClick={stakeRewardsClaim} disabled={!PopClaimVO.submitEnable} className="sub_btn confirm">CLAIM</Button>
                    </div>
                </div>
            </Overlay>
        );
    }
};

export default PopClaim;
