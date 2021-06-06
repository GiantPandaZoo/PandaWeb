import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, Input, Radio, Overlay, ResponsiveGrid} from '@alifd/next';
import log from "../../../../components/Log";


import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import PoolRewardsDAO from "./PoolRewardsDAO";
import RedeemRewardsVO from "./RedeemRewardsVO";

const {Cell} = ResponsiveGrid;
const RadioGroup = Radio.Group;


const closePoolRewardsDialog=()=>{
    RedeemRewardsVO.setShow(false);
};

const claimPoolRewards = () => {
    log.debug(`claimPoolRewards...`);
    PoolRewardsDAO.claimPoolRewards();
};

const poolItemClick = (pool) => {
    RedeemRewardsVO.setCurrentPool(pool);
    RedeemRewardsVO.checkClaimEnable();
};

@observer
class RedeemRewards extends Component {
    render() {
        return (
            <Overlay visible={RedeemRewardsVO.show}
                // safeNode={() => this.btn}
                     align="cc cc"
                     hasMask
                     disableScroll className={'overlay_container opa_pop_windows'}>
                <div>
                    <div className={'item title'}>REDEEM REWARDS</div>
                    <div className={'item'}>My Wallet Address</div>
                    <div className={'item'}>
                        <Input
                            disabled
                            aria-label="disabled"
                            className={'f_input'}
                            value={currentAccountStorage.account}
                        />
                    </div>

                    <div className={'item coin_item'}>
                        <span className={RedeemRewardsVO.assetIcon}></span>
                        <span className={'asset'}>{RedeemRewardsVO.asset}</span>
                    </div>

                    <div className={'item pool_rewards_item_box'}>
                        <RadioGroup
                            shape="button"
                            size="large"
                            value={RedeemRewardsVO.currentPool}
                            onChange={poolItemClick}
                        >
                            <Radio id="callPoolContract" value="callPoolContract">
                                <div className={'pool'}>Call Option Underwriting Pool</div>
                                <div className={'rewards_box'}>
                                    <span className={'rewards'}>{RedeemRewardsVO.callPoolRewardsShow}</span>
                                    <span className={'unit'}>OPA</span>
                                </div>
                            </Radio>
                            <Radio id="putPoolContract" value="putPoolContract">
                                <div className={'pool'}>Put Option Underwriting Pool</div>
                                <div className={'rewards_box'}>
                                    <span className={'rewards'}>{RedeemRewardsVO.putPoolRewardsShow}</span>
                                    <span className={'unit'}>OPA</span>
                                </div>
                            </Radio>
                        </RadioGroup>
                    </div>

                    <div className={'item sub_btn_box sub_box_pool'}>
                        <Button type="primary" size="large" onClick={closePoolRewardsDialog}  className="sub_btn cancel">CANCEL</Button>
                        <Button type="primary" size="large" onClick={claimPoolRewards} disabled={!RedeemRewardsVO.claimEnable} className="sub_btn confirm">CLAIM</Button>
                    </div>
                </div>
            </Overlay>
        );
    }
};

export default RedeemRewards;
