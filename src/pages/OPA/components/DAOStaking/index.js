import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, ResponsiveGrid} from '@alifd/next';
import log from "../../../../components/Log";

import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import PopStakeVO from "../PopStake/PopStakeVO";
import PopStake from "../PopStake";
import PopClaimVO from "../PopClaim/PopClaimVO";
import PopClaim from "../PopClaim";
import PopWithdraw from "../PopWithdraw";
import PopWithdrawVO from "../PopWithdraw/PopWithdrawVO";
import DAOStakingVO from "./DAOStakingVO";
import OPAStatsVO from "../OPAStats/OPAStatsVO";
import DAOStakingDAO from "./DAOStakingDAO";
import AssetBalance from "../../../../components/AssetBalance";
import PopConnectWalletVO from "../PopConnectWallet/PopConnectWalletVO";
import PopConnectWallet from "../PopConnectWallet";

const { Cell } = ResponsiveGrid;

const opaStake = ()=>{
    if (currentAccountStorage.account) {
        PopStakeVO.setTitle('STAKE OPA TOKEN');
        PopStakeVO.setAsset('OPA');
        PopStakeVO.setAssetUnit('OPA');
        PopStakeVO.setStakeAsset('OPA');

        let balance=AssetBalance.getAssetBalance(PopStakeVO.stakeAsset);
        log.debug(`balance of ${PopStakeVO.stakeAsset} => ${balance}`);
        PopStakeVO.setMaxStake(balance);

        PopStakeVO.setPopEventSource('DAO');
        PopStakeVO.setShow(true);
    } else {
        PopConnectWalletVO.setShow(true);
    }
};

const opaClaim = ()=>{
    if (currentAccountStorage.account) {
        PopClaimVO.setRewardsFrom('OPA DAO Staking');
        PopClaimVO.setRewards(DAOStakingVO.myDaoRewards);
        PopClaimVO.setPopEventSource('DAO');
        PopClaimVO.setShow(true);
    } else {
        PopConnectWalletVO.setShow(true);
    }
};

const opaWithdraw = ()=>{
    if (currentAccountStorage.account) {
        PopWithdrawVO.setTitle('WITHDRAW OPA TOKEN');
        PopWithdrawVO.setAssetDes('OPA DAO Staking');
        PopWithdrawVO.setAssetUnit('OPA');
        PopWithdrawVO.setStakeAsset('OPA');

        PopWithdrawVO.setMaxWithdraw(DAOStakingVO.myDaoStaked);
        PopWithdrawVO.setPopEventSource('DAO');
        PopWithdrawVO.setShow(true);
    } else {
        PopConnectWalletVO.setShow(true);
    }
};

@observer
class DAOStaking extends Component {
    componentDidMount() {
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                PopConnectWalletVO.setShow(false);
                DAOStakingDAO.loadDAOStakingData();
            }
        });

        autorun(() => {
            if(DAOStakingVO.totalStakedShow && OPAStatsVO.priceShow){
                DAOStakingVO.setTotalStakedValue();
                DAOStakingDAO.loadMyDAOAPR();
            }
        });

        autorun(() => {
            if(PopStakeVO.popEventSource == 'DAO' && PopStakeVO.popEventTimestamp){
                DAOStakingDAO.daoStake();
            }
        });

        autorun(() => {
            if(PopClaimVO.popEventSource == 'DAO' && PopClaimVO.popEventTimestamp){
                DAOStakingDAO.daoClaim();
            }
        });

        autorun(() => {
            if(PopWithdrawVO.popEventSource == 'DAO' && PopWithdrawVO.popEventTimestamp){
                DAOStakingDAO.daoWithdraw();
            }
        });
    }

    render() {
        return (
            <section className="section opa_dao_container">
                <PopConnectWallet/>
                <PopStake/>
                <PopClaim/>
                <PopWithdraw/>
                <div className="section_container">
                    <div className={'opa_section_title'}>OPA DAO Staking</div>

                    <ResponsiveGrid gap={0} className={'dao_staking_box'} columns={3}>
                        <Cell className="grid-3 section_item staking_header" colSpan={3}>
                            <span className={'coin_icon coin_icon_opa'}></span>
                            <span>Total Staked</span>
                            <span className={'total'}>{DAOStakingVO.totalStakedShow}</span>
                            <span className={'total_unit'}>OPA</span>
                            <span className={'total_value'}>≈ $ {DAOStakingVO.totalStakedValue}</span>
                        </Cell>
                        <Cell className="grid-1 section_item staking_item" colSpan={1}>
                            <div>
                                <span className={'value'}>{DAOStakingVO.myDaoStakedShow}</span>
                                <span className={'unit'}>OPA</span>
                            </div>
                            <div className={'item_name'}>Staked</div>
                            <div>
                                <Button type="primary" size="large" onClick={opaStake} className="sub_btn">STAKE OPA TOKEN</Button>
                            </div>
                        </Cell>
                        <Cell className="grid-1 section_item staking_item" colSpan={1}>
                            <div>
                                <span className={'value'}>{DAOStakingVO.myDaoRewardsShow}</span>
                                <span className={'unit'}>OPA</span>
                            </div>
                            <div className={'item_name'}>Rewards</div>
                            <div>
                                <Button type="primary" size="large" onClick={opaClaim} className="sub_btn sub_btn_short">REDEEM REWARDS</Button>
                            </div>
                        </Cell>
                        <Cell className="grid-1 section_item staking_item" colSpan={1}>
                            <div>
                                <span className={'value'}>{DAOStakingVO.myDaoApr}</span>
                                <span className={'unit'}>%</span>
                            </div>
                            <div className={'item_name'}>Reward APR</div>
                            <div>
                                <Button type="primary" size="large" onClick={opaWithdraw} className="sub_btn sub_btn_short">WITHDRAW OPA TOKEN</Button>
                            </div>
                        </Cell>
                    </ResponsiveGrid>
                </div>
            </section>
        );
    }
};

export default DAOStaking;
