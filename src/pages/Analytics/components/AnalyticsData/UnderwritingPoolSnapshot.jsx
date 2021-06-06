import React, { Component } from 'react';

import './index.scss';
import {ConfigProvider, ResponsiveGrid, Table} from '@alifd/next';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import { autorun } from 'mobx'
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import UnderwritingPoolSnapshotVO from "./UnderwritingPoolSnapshotVO";
import AnalyticsVO from "./AnalyticsVO";
import AnalyticsDAO from "./AnalyticsDAO";
import UnderlyingAssetVO from "./UnderlyingAssetVO";
import CountdownTimer from "../../../../components/Countdown/CountdownTimer";
import {NextComponentLocaleConfig} from "../../../../components";

const { Cell } = ResponsiveGrid;

const setPoolDataCellProps = (rowIndex, colIndex, dataIndex, record) => {
    if (colIndex == 6) {
        return {
            className: record["revenueStyle"]
        };
    }else if(colIndex == 8) {
        return {
            className: record["countdownStyle"]
        };
    }
};

@observer
class UnderwritingPoolSnapshot extends Component {
    componentDidMount() {
        autorun(() => {
            if(AnalyticsVO.coinName && UnderlyingAssetVO.currentPrice && WebThreeLoadEvent.isLoaded){
                AnalyticsDAO.loadUnderwritingPoolSnapshotData();
            }
        });

        autorun(() => {
            if(!UnderwritingPoolSnapshotVO.isLoading && CountdownTimer.round){
                UnderwritingPoolSnapshotVO.refreshExpiryDate();
            }
        });
    }

    render() {
        return (
            <ResponsiveGrid gap={20} className={'analytics_item analytics_pool_snapshot'}>
                <Cell className="grid-12 section_item section_title" colSpan={12}>
                    {intl.get('page.analytics.snapshot.title')}
                </Cell>

                <Cell className="grid-12 section_item section_pool_snapshot_box" colSpan={12}>
                    <ConfigProvider locale={NextComponentLocaleConfig}>
                        <Table dataSource={UnderwritingPoolSnapshotVO.poolData} cellProps={setPoolDataCellProps}>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.type')} dataIndex="poolType" className={'type'}/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.duration')} dataIndex="durationShow" className={'duration'}/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.position')} dataIndex="positionShow"/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.available')} dataIndex="availableShow" className={'available'}/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.strikePrice')} dataIndex="strikePriceShow" />
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.currentPrice')} dataIndex="currentPriceShow"/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.revenue')} dataIndex="revenueShow"/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.expiryDate')} dataIndex="expiryDateShow" className={'expiryDate'}/>
                            <Table.Column title={intl.get('page.analytics.snapshot.table.title.countdown')} dataIndex="countdown"/>
                        </Table>
                    </ConfigProvider>
                </Cell>
            </ResponsiveGrid>
        );
    }
}

export default UnderwritingPoolSnapshot;
