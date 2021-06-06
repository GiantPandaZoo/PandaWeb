import React, { Component } from 'react';

import './index.scss';
import {Button, ConfigProvider, ResponsiveGrid, Table} from '@alifd/next';
import intl from 'react-intl-universal';
import IfConnectedWallet from '../../../../components/ConnectWallet/IfConnectedWallet';
import { observer } from 'mobx-react';
import { autorun } from 'mobx'
import OptionTradingDAO from './OptionTradingDAO';
import ProfitVO from './ProfitVO';
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import DataRefreshTimer from "../../../../components/DataRefreshTimer";
import {NextComponentLocaleConfig} from "../../../../components";

const { Cell } = ResponsiveGrid;

const assetRender = (value, index, record) => {
    return (
        <div className={'asset_box'}>
            <div className={`coin_icon ${record.coinIcon}`}></div>
            <div className={'asset_name'}>{record.coinName}</div>
        </div>
    );
};

const profitRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.profitTxt}</span>
            <span className={'unit'}>{record.assetName}</span>
        </div>
    );
};

const claimRender = (value, index, record) => {
    return (
        <Button type="primary" size="large" onClick={claimProfit.bind(this, record.coinName, record.poolType)} className="sub_btn sub_btn_short" disabled={!value}>
            {intl.get('page.home.trading.profit')}
        </Button>
    );
};

const claimProfit = (coinName, optionType)=>{
    OptionTradingDAO.claimProfits(coinName, optionType);
};

@observer
class Profit extends Component {
    componentDidMount() {
        autorun(()=>{
            if(DataRefreshTimer.round){
                if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                    OptionTradingDAO.loadProfits();
                }
            }
        });
    }

    render() {
        return (
            <IfConnectedWallet>
                <ResponsiveGrid gap={20} className={'option_profit'}>
                    <Cell className="grid-12 section_item section_title" colSpan={12}>
                        {intl.get('page.home.trading.title.profit')}
                    </Cell>

                    <Cell className="grid-12 section_item section_profit_box" colSpan={12}>
                        <ResponsiveGrid gap={80} className={'profit_table_box'} columns={2}>
                            <Cell className="grid-1 profit_box " colSpan={1}>
                                <div className={'profit_box_title'}>{intl.get('page.home.trading.profit.title.call')}</div>
                                <ConfigProvider locale={NextComponentLocaleConfig}>
                                    <Table dataSource={ProfitVO.callDataArr}>
                                        <Table.Column title={intl.get('page.home.trading.profit.table.title.asset')} className={'asset'} cell={assetRender}/>
                                        <Table.Column title={intl.get('page.home.trading.profit.table.title.profit')} className={'profit_cell'} cell={profitRender}/>
                                        <Table.Column dataIndex="claimEnable" className={'claim_cell'} cell={claimRender}/>
                                    </Table>
                                </ConfigProvider>
                            </Cell>
                            <Cell className="grid-1 profit_box " colSpan={1}>
                                <div className={'profit_box_title'}>{intl.get('page.home.trading.profit.title.put')}</div>
                                <ConfigProvider locale={NextComponentLocaleConfig}>
                                    <Table dataSource={ProfitVO.putDataArr}>
                                        <Table.Column title={intl.get('page.home.trading.profit.table.title.asset')} className={'asset'} cell={assetRender}/>
                                        <Table.Column title={intl.get('page.home.trading.profit.table.title.profit')} className={'profit_cell'} cell={profitRender}/>
                                        <Table.Column dataIndex="claimEnable" className={'claim_cell'} cell={claimRender}/>
                                    </Table>
                                </ConfigProvider>
                            </Cell>
                        </ResponsiveGrid>
                    </Cell>
                </ResponsiveGrid>
            </IfConnectedWallet>
        );
    }
}

export default Profit;
