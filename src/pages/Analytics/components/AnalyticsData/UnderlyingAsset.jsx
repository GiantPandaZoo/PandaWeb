import React, { Component } from 'react';

import './index.scss';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import { autorun } from 'mobx'
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import AnalyticsVO from "./AnalyticsVO";
import UnderlyingAssetVO from "./UnderlyingAssetVO";
import AnalyticsDAO from "./AnalyticsDAO";
import DataRefreshTimer from "../../../../components/DataRefreshTimer";
import CurrentChainStorage from "../../../../components/Web3/CurrentChainStorage";

const { Cell } = ResponsiveGrid;

@observer
class UnderlyingAsset extends Component {
    componentDidMount() {
        autorun(() => {
            if(AnalyticsVO.coinName && WebThreeLoadEvent.isLoaded && CurrentChainStorage.chainId){
                AnalyticsDAO.loadUnderlyingAsset();
            }
        });

        autorun(()=>{
            if(DataRefreshTimer.round){
                if(WebThreeLoadEvent.isLoaded){
                    AnalyticsDAO.loadUnderlyingAsset();
                }
            }
        });
    }

    render() {
        return (
            <ResponsiveGrid gap={20} className={'analytics_item analytics_asset'}>
                <Cell className="grid-12 section_item section_title" colSpan={12}>
                    {intl.get('page.analytics.asset.title')}
                </Cell>

                <Cell className="grid-12 section_item section_asset_box" colSpan={12}>
                    <ResponsiveGrid gap={10} className={'asset_box'} columns={3}>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'b t'}><span className={'value'}>{UnderlyingAssetVO.totalAssetQuantityShow}</span>  {AnalyticsVO.coinName}</div>
                            <div className={'usd'}>≈${UnderlyingAssetVO.totalAssetValue}</div>
                            <div className={'b'}>{intl.get('page.analytics.asset.position.total')}</div>
                        </Cell>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'b t'}><span className={'value'}>{UnderlyingAssetVO.callAssetQuantityShow}</span>  {AnalyticsVO.coinName}</div>
                            <div className={'usd'}>≈${UnderlyingAssetVO.callAssetValue}</div>
                            <div className={'b'}>{intl.get('page.analytics.asset.position.call')}</div>
                        </Cell>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'b t'}><span className={'value'}>{UnderlyingAssetVO.putAssetQuantityShow}</span>  {AnalyticsVO.coinName}</div>
                            <div className={'usd'}>≈${UnderlyingAssetVO.putAssetValue}</div>
                            <div className={'b'}>{intl.get('page.analytics.asset.position.put')}</div>
                        </Cell>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'b t'}><span className={'value'}>{UnderlyingAssetVO.totalIncomeQuantityShow}</span>  USDT</div>
                            <div className={'b'}>{intl.get('page.analytics.asset.income.total')}</div>
                        </Cell>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'b t'}><span className={'value'}>{UnderlyingAssetVO.callIncomeQuantityShow}</span>  USDT</div>
                            <div className={'b'}>{intl.get('page.analytics.asset.income.call')}</div>
                        </Cell>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'b t'}><span className={'value'}>{UnderlyingAssetVO.putIncomeQuantityShow}</span>  USDT</div>
                            <div className={'b'}>{intl.get('page.analytics.asset.income.put')}</div>
                        </Cell>
                    </ResponsiveGrid>
                </Cell>
            </ResponsiveGrid>
        );
    }
}

export default UnderlyingAsset;
