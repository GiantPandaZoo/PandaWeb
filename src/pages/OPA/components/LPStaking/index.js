import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, ResponsiveGrid} from '@alifd/next';
import log from "../../../../components/Log";

import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import getCoinIcon from "../Coin";
import PopStakeVO from "../PopStake/PopStakeVO";
import PopClaimVO from "../PopClaim/PopClaimVO";
import PopWithdrawVO from "../PopWithdraw/PopWithdrawVO";
import LPStakingVO from "./LPStakingVO";
import LPStakingDAO from "./LPStakingDAO";
import AssetBalance from "../../../../components/AssetBalance";
import PopConnectWalletVO from "../PopConnectWallet/PopConnectWalletVO";

const { Cell } = ResponsiveGrid;

const lpStake = (pairName, assetName, plUrl, assetDes)=>{
    if (currentAccountStorage.account) {
        PopStakeVO.setTitle(`STAKE ${pairName} LP TOKEN`);
        PopStakeVO.setAsset('LP Token');
        PopStakeVO.setAssetUnit('LP Token');
        PopStakeVO.setStakeAsset(assetName);
        PopStakeVO.setAssetDes(assetDes);

        PopStakeVO.setProviderLiquidityUrl(plUrl);

        let balance=AssetBalance.getAssetBalance(PopStakeVO.stakeAsset);
        log.debug(`balance of ${PopStakeVO.stakeAsset} => ${balance}`);
        PopStakeVO.setMaxStake(balance);

        PopStakeVO.setPopEventSource('LP');
        PopStakeVO.setShow(true);
    } else {
        PopConnectWalletVO.setShow(true);
    }
};

const lpClaim = (pairName, rewardsFrom, rewards)=>{
    if (currentAccountStorage.account) {
        PopClaimVO.setRewardsFrom(rewardsFrom);
        PopClaimVO.setRewards(rewards);
        PopClaimVO.setPopEventSource('LP');
        PopClaimVO.setShow(true);
    } else {
        PopConnectWalletVO.setShow(true);
    }
};

const lpWithdraw = (pairName, assetName, assetDes, staked)=>{
    if (currentAccountStorage.account) {
        PopWithdrawVO.setTitle(`WITHDRAW ${pairName} LP TOKEN`);
        PopWithdrawVO.setAssetDes(assetDes);
        PopWithdrawVO.setAssetUnit('LP Token');
        PopWithdrawVO.setStakeAsset(assetName);

        PopWithdrawVO.setMaxWithdraw(staked);
        PopWithdrawVO.setPopEventSource('LP');
        PopWithdrawVO.setShow(true);
    } else {
        PopConnectWalletVO.setShow(true);
    }
};

@observer
class LPStaking extends Component {
    componentDidMount() {
        LPStakingDAO.loadLPStakingItem();

        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account && LPStakingVO.lpDEXDataArr){
                LPStakingDAO.loadLPStakingData();
            }
        });

        autorun(() => {
            if(PopStakeVO.popEventSource == 'LP' && PopStakeVO.popEventTimestamp){
                LPStakingDAO.lpStake();
            }
        });

        autorun(() => {
            if(PopClaimVO.popEventSource == 'LP' && PopClaimVO.popEventTimestamp){
                LPStakingDAO.lpClaim();
            }
        });

        autorun(() => {
            if(PopWithdrawVO.popEventSource == 'LP' && PopWithdrawVO.popEventTimestamp){
                LPStakingDAO.lpWithdraw();
            }
        });
    }

    render() {
        return (
            <section className="section opa_lp_container">
                {
                    LPStakingVO.lpDEXDataArr.map(dex => (
                        <div key={dex.dexName} className="section_container">
                            <div className={'opa_section_title'}>OPA LP Staking @{dex.dexName}</div>

                            <ResponsiveGrid gap={20} className={'dao_staking_box'} columns={3}>
                                {
                                    dex.lpStakingDataArr.map(pair => (
                                        <Cell key={pair.tokenPairName} className="grid-1 section_item staking_item" colSpan={1}>
                                            <div className={'staking_header'}>
                                                <div className={'coin_icon_group'}>
                                                    <span className={`coin_icon ${getCoinIcon(pair.tokenArr[0])}`}></span>
                                                    <span className={`coin_icon ${getCoinIcon(pair.tokenArr[1])}`}></span>
                                                </div>
                                                <div>{pair.tokenPairName} @{dex.dexName}</div>
                                            </div>

                                            <div className={'total_box'}>
                                                <div>Total Staked</div>
                                                <div className={'total_value_box'}>
                                                    <span className={'total'}>{pair.totalStakedShow}</span>
                                                    <span className={'unit'}>LP Token</span>
                                                </div>
                                                <div className={'total_value'}>≈$ {pair.totalStakedValue}</div>
                                            </div>

                                            <div className={'stake_info_box'}>
                                                <div>Staked</div>
                                                <div className={'stake_value'}>{pair.myStakedShow} <span className={'unit'}>LP Token</span></div>
                                            </div>
                                            <div className={'stake_info_box'}>
                                                <div>Rewards</div>
                                                <div className={'stake_value'}>{pair.myRewardsShow} <span className={'unit'}>OPA</span></div>
                                            </div>
                                            <div className={'stake_info_box'}>
                                                <div>Reward APR</div>
                                                <div className={'stake_value'}>{pair.myApr} <span className={'unit'}>%</span></div>
                                            </div>

                                            <div className={'sub_btn_box'}>
                                                <Button type="primary" size="large" onClick={lpStake.bind(this, pair.tokenPairName, pair.assetName, pair.provideLiquidityUrl, `${pair.tokenPairName}@${dex.dexName}`)} className="sub_btn">{`STAKE ${pair.tokenPairName} LP TOKEN`}</Button>
                                                <Button type="primary" size="large" onClick={lpWithdraw.bind(this, pair.tokenPairName, pair.assetName, `${pair.tokenPairName}@${dex.dexName}`, pair.myStaked)} className="sub_btn sub_btn_short">{`WITHDRAW ${pair.tokenPairName} LP TOKEN`}</Button>
                                                <Button type="primary" size="large" onClick={lpClaim.bind(this, pair.tokenPairName, `${pair.tokenPairName}@${dex.dexName}`, pair.myRewards)} className="sub_btn sub_btn_short">REDEEM REWARDS</Button>
                                            </div>
                                        </Cell>
                                    ))
                                }
                            </ResponsiveGrid>
                        </div>
                    ))
                }
            </section>
        );
    }
};

export default LPStaking;
