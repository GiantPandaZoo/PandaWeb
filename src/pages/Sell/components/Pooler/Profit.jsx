import React, { Component } from 'react';

import './index.scss';
import {Button, Input, ConfigProvider, ResponsiveGrid, Table, Overlay, NumberPicker} from '@alifd/next';
import intl from 'react-intl-universal';
import IfConnectedWallet from '../../../../components/ConnectWallet/IfConnectedWallet';
import { observer } from 'mobx-react';
import { autorun } from 'mobx'
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import PoolerDAO from "./PoolerDAO";
import {NextComponentLocaleConfig} from "../../../../components";
import ProfitVO from "./ProfitVO";
import ProfitWithdrawVO from "./ProfitWithdrawVO";

const { Cell } = ResponsiveGrid;

const assetRender = (value, index, record) => {
    return (
        <div className={'asset_box'}>
            <div className={`coin_icon ${record.coinIcon}`}></div>
            <div className={'asset_name'}>{record.coinName}</div>
        </div>
    );
};

const investmentRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.assetQuantityTxt}</span>
            <span className={'unit'}>{record.assetName}</span>
        </div>
    );
};

const poolTotalRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.assetPoolQuantityTxt}</span>
            <span className={'unit'}>{record.assetName}</span>
        </div>
    );
};

const contributionRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.getAssetContribution()}</span>
            <span className={'unit'}>%</span>
        </div>
    );
};

const withdrawableRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.assetAvailableQuantityTxt}</span>
            <span className={'unit'}>{record.assetName}</span>
        </div>
    );
};

const incomeRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.incomeQuantityTxt}</span>
            <span className={'unit'}>{record.incomeAssetCoinName}</span>
        </div>
    );
};

const aprRender = (value, index, record) => {
    return (
        <div>
            <span className={`value`}>{record.apr}</span>
            <span className={'unit'}>%</span>
        </div>
    );
};

const operationRender = (value, index, record) => {
    return (
        <div className={'btn_box'}>
            <Button type="primary" size="large" onClick={openWithdrawDialog.bind(this,record)} className="sub_btn sub_btn_short" disabled={!record.withdrawEnable}>
                {intl.get('page.sell.pooler.investment')}
            </Button>
            <Button type="primary" size="large" onClick={claim.bind(this, record)} className="sub_btn sub_btn_short" disabled={!record.claimEnable}>
                {intl.get('page.sell.pooler.income')}
            </Button>
        </div>
    );
};

const openWithdrawDialog=(profitData)=>{
    ProfitWithdrawVO.setByProfitData(profitData);
    ProfitWithdrawVO.setShowWithdrawDialog(true);
};

const closeWithdrawDialog=()=>{
    ProfitWithdrawVO.setShowWithdrawDialog(false);
};

const withdrawQuantityChange = (value) => {
    ProfitWithdrawVO.setWithdrawQuantity(value);
};

const withdraw=()=>{
    PoolerDAO.withdraw();
};

const claim=(profitData)=>{
    PoolerDAO.claim(profitData);
};

@observer
class Profit extends Component {
    componentDidMount() {
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                PoolerDAO.loadMyProfit();
            }
        });
    }

    render() {
        return (
            <IfConnectedWallet>
                <Overlay visible={ProfitWithdrawVO.showWithdrawDialog}
                    // safeNode={() => this.btn}
                         align="cc cc"
                         hasMask
                         disableScroll className={'overlay_container'}>
                    <div>
                        <div className={'item title'}>{intl.get('page.sell.pooler.investment.withdraw.title')}</div>
                        <div className={'item'}>{intl.get('page.sell.pooler.investment.withdraw.address')}</div>
                        <div className={'item'}>
                            <Input
                                disabled
                                aria-label="disabled"
                                className={'f_input'}
                                value={currentAccountStorage.account}
                            />
                        </div>

                        <div className={'item'}>{intl.get('page.sell.pooler.investment.withdraw.quantity')}</div>
                        <div className={'item'}>
                            <NumberPicker
                                innerAfter={ProfitWithdrawVO.assetCoinName}
                                className={'f_input f_input_long'}
                                value={ProfitWithdrawVO.withdrawQuantity}
                                step={1}
                                precision={18}
                                min={0}
                                max={ProfitWithdrawVO.withdrawAbleQuantityShow}
                                onChange={withdrawQuantityChange}
                                hasTrigger={false}
                            />
                        </div>

                        <div className={'item'}>{intl.get('page.sell.pooler.investment.withdraw.available')} <span className={'tips'}>{ProfitWithdrawVO.withdrawAbleQuantityShow}</span> <span className={'tips'}>{ProfitWithdrawVO.assetName}</span></div>
                        <div className={'item item_des'}>{intl.get('page.sell.pooler.investment.available')} <span className={'tips'}>{ProfitWithdrawVO.assetAvailableQuantityTxt} {ProfitWithdrawVO.assetName}</span></div>
                        <div className={'item sub_btn_box'}>
                            <Button type="primary" size="large" onClick={closeWithdrawDialog}  className="sub_btn cancel">
                                {intl.get('page.sell.pooler.investment.withdraw.cancel')}
                            </Button>
                            <Button type="primary" size="large" onClick={withdraw}  className="sub_btn confirm" disabled={!ProfitWithdrawVO.withdrawEnable}>
                                {intl.get('page.sell.pooler.investment.withdraw.confirm')}
                            </Button>
                        </div>
                    </div>
                </Overlay>

                <ResponsiveGrid gap={20} className={'pooler_income'}>
                    <Cell className="grid-12 section_item section_title" colSpan={12}>
                        {intl.get('page.sell.pooler.title.profit')}
                    </Cell>

                    <Cell className="grid-12 section_item section_investment_box" colSpan={12}>
                        <div className={'investment_box_title'}>{intl.get('page.sell.pooler.title.call')}</div>
                        <ConfigProvider locale={NextComponentLocaleConfig}>
                            <Table dataSource={ProfitVO.callDataArr}>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.asset')} className={'asset'} cell={assetRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.investment')} className={'amount'} cell={investmentRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.poolTotal')} className={'amount'} cell={poolTotalRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.contribution')} className={'percentage_amount'} cell={contributionRender}/>
                                {/*<Table.Column title={intl.get('page.sell.pooler.profit.table.title.withdrawable')} className={'amount'} cell={withdrawableRender}/>*/}
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.income')} className={'amount'} cell={incomeRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.apr')} className={'percentage_amount'} cell={aprRender}/>
                                <Table.Column className={'operation_cell'} cell={operationRender}/>
                            </Table>
                        </ConfigProvider>
                    </Cell>

                    <Cell className="grid-12 section_item section_investment_box" colSpan={12}>
                        <div className={'investment_box_title'}>{intl.get('page.sell.pooler.title.put')}</div>
                        <ConfigProvider locale={NextComponentLocaleConfig}>
                            <Table dataSource={ProfitVO.putDataArr}>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.asset')} className={'asset'} cell={assetRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.investment')} className={'amount'} cell={investmentRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.poolTotal')} className={'amount'} cell={poolTotalRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.contribution')} className={'percentage_amount'} cell={contributionRender}/>
                                {/*<Table.Column title={intl.get('page.sell.pooler.profit.table.title.withdrawable')} className={'amount'} cell={withdrawableRender}/>*/}
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.income')} className={'amount'} cell={incomeRender}/>
                                <Table.Column title={intl.get('page.sell.pooler.profit.table.title.apr')} className={'percentage_amount'} cell={aprRender}/>
                                <Table.Column className={'operation_cell'} cell={operationRender}/>
                            </Table>
                        </ConfigProvider>
                    </Cell>
                </ResponsiveGrid>
            </IfConnectedWallet>
        );
    }
}

export default Profit;
