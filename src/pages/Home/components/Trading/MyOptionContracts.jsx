import React, { Component } from 'react';

import './index.scss';
import {ConfigProvider,ResponsiveGrid, Table } from '@alifd/next';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import { autorun } from 'mobx'
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import MyOptionContractsVO from "./MyOptionContractsVO";
import IfConnectedWallet from "../../../../components/ConnectWallet/IfConnectedWallet";
import OptionTradingDAO from "./OptionTradingDAO";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import CountdownTimer from "../../../../components/Countdown/CountdownTimer";
import DataRefreshTimer from "../../../../components/DataRefreshTimer";
import {NextComponentLocaleConfig} from "../../../../components";

const { Cell } = ResponsiveGrid;

const setOptionDataCellProps = (rowIndex, colIndex, dataIndex, record) => {
    if (colIndex == 7) {
        return {
            className: record["revenueStyle"]
        };
    }else if(colIndex == 9) {
        return {
            className: record["countdownStyle"]
        };
    }
};

@observer
class MyOptionContracts extends Component {
    componentDidMount() {
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account && DataRefreshTimer.round){
                OptionTradingDAO.loadMyOptionsData();
            }
        });

        autorun(() => {
            if(CountdownTimer.round){
                if(!MyOptionContractsVO.isLoading){
                    MyOptionContractsVO.refreshExpiryDate();
                }
            }
        });
    }

    render() {
        return (
            <IfConnectedWallet>
                <ResponsiveGrid gap={20} className={'analytics_item my_option'}>
                    <Cell className="grid-12 section_item section_title module_title" colSpan={12}>
                        {intl.get('page.home.options.title')}
                    </Cell>

                    <Cell className="grid-12 section_item section_my_option_box" colSpan={12}>
                        <ConfigProvider locale={NextComponentLocaleConfig}>
                            <Table dataSource={MyOptionContractsVO.dataArr} cellProps={setOptionDataCellProps}>
                                <Table.Column title={intl.get('page.home.options.table.title.asset')} dataIndex="coinName" className={'asset'}/>
                                <Table.Column title={intl.get('page.home.options.table.title.type')} dataIndex="poolType" className={'type'}/>
                                <Table.Column title={intl.get('page.home.options.table.title.duration')} dataIndex="durationShow" className={'duration'}/>
                                <Table.Column title={intl.get('page.home.options.table.title.position')} dataIndex="positionShow" className={'position'}/>
                                <Table.Column title={intl.get('page.home.options.table.title.strikePrice')} dataIndex="strikePriceShow" />
                                <Table.Column title={intl.get('page.home.options.table.title.premium')} dataIndex="premiumShow" className={'premium'}/>
                                <Table.Column title={intl.get('page.home.options.table.title.currentPrice')} dataIndex="currentPriceShow"/>
                                <Table.Column title={intl.get('page.home.options.table.title.revenue')} dataIndex="revenueShow"/>
                                <Table.Column title={intl.get('page.home.options.table.title.expiryDate')} dataIndex="expiryDateShow" className={'expiryDate'}/>
                                <Table.Column title={intl.get('page.home.options.table.title.countdown')} dataIndex="countdown"/>
                            </Table>
                        </ConfigProvider>
                    </Cell>
                </ResponsiveGrid>
            </IfConnectedWallet>
        );
    }
}

export default MyOptionContracts;
