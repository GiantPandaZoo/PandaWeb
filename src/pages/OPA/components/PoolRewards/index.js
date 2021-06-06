import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, ConfigProvider, ResponsiveGrid, Table} from '@alifd/next';
import log from "../../../../components/Log";

import {NextComponentLocaleConfig} from "../../../../components";
import PoolRewardsVO from "./PoolRewardsVO";
import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";

import {observer} from "mobx-react";
import PoolRewardsDAO from "./PoolRewardsDAO";
import RedeemRewardsVO from "./RedeemRewardsVO";
import RedeemRewards from "./RedeemRewards";
import IfConnectedWallet from "../../../../components/ConnectWallet/IfConnectedWallet";

const poolRewardRedeem = (poolRewardsData) => {
    log.debug(poolRewardsData);
    RedeemRewardsVO.setWithPoolRewardsData(poolRewardsData);
    RedeemRewardsVO.checkClaimEnable();
    RedeemRewardsVO.setShow(true);
};


const poolCoinRender = (value, index, record) => {
    return <div className={'asset_cell'}>
        <span className={record.assetIcon}></span>
        <span className={'asset'}>{record.asset}</span>
    </div>;
};

const callPoolRender = (value, index, record) => {
    return <div>
        <span>{record.callPoolRewardsShow}</span>
        <span className={'unit'}>OPA</span>
    </div>;
};

const putPoolRender = (value, index, record) => {
    return <div>
        <span>{record.putPoolRewardsShow}</span>
        <span className={'unit'}>OPA</span>
    </div>;
};

const poolRewardsOperationRender = (value, index, record) => {
    return <Button type="primary" onClick={poolRewardRedeem.bind(this,record)} size="small" className="sub_btn sub_btn_short">REDEEM REWARDS</Button>;
};

@observer
class PoolRewards extends Component {
    componentDidMount() {
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                PoolRewardsDAO.loadPoolRewards();
            }
        });
    }

    render() {
        return (
            <IfConnectedWallet>
                <section className="section opa_p_container">
                    <div className="section_container">
                        <RedeemRewards/>

                        <div className={'opa_total total_value'}>
                            <span className={'value'}>{PoolRewardsVO.totalRewards}</span> <span className={'unit'}>OPA</span>
                        </div>
                        <div className={'opa_total'}>
                            My OPA Reward from Pooled Underwriting
                        </div>

                        <ConfigProvider locale={NextComponentLocaleConfig}>
                            <Table dataSource={PoolRewardsVO.dataArr} className={'rewards_table'}>
                                <Table.Column dataIndex="asset" className={''} cell={poolCoinRender}/>
                                <Table.Column title={'Call Option Underwriting Pool'} cell={callPoolRender} className={''}/>
                                <Table.Column title={'Put Option Underwriting Pool'} cell={putPoolRender} className={''}/>
                                <Table.Column title={'Action'} cell={poolRewardsOperationRender}/>
                            </Table>
                        </ConfigProvider>
                    </div>
                </section>
            </IfConnectedWallet>
        );
    }
};

export default PoolRewards;
