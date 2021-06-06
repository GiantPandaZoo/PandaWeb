import React, { Component } from 'react';

import './index.scss';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';
import { observer } from 'mobx-react';
import { autorun } from 'mobx'
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import AnalyticsVO from "./AnalyticsVO";
import UnderlyingAssetVO from "./UnderlyingAssetVO";
import UnderwritingPoolVO from "./UnderwritingPoolVO";
import AnalyticsDAO from "./AnalyticsDAO";

const { Cell } = ResponsiveGrid;

@observer
class UnderwritingPool extends Component {
    componentDidMount() {
        autorun(() => {
            if(AnalyticsVO.coinName && WebThreeLoadEvent.isLoaded && UnderlyingAssetVO.currentPrice){
                AnalyticsDAO.loadUnderlyingPool();
            }
        });

        autorun(() => {
            if(UnderlyingAssetVO.callAssetQuantityShow && UnderwritingPoolVO.callTotalAsset){
                UnderwritingPoolVO.setCallAvailableAssetQuantityShow();
            }
        });

        autorun(() => {
            if(UnderlyingAssetVO.putAssetQuantityShow && UnderwritingPoolVO.putTotalAsset){
                UnderwritingPoolVO.setPutAvailableAssetQuantityShow();
            }
        });
    }

    render() {
        return (
            <ResponsiveGrid gap={20} className={'analytics_item analytics_pool'}>
                <Cell className="grid-12 section_item section_title" colSpan={12}>
                    {intl.get('page.analytics.pool.title')}
                </Cell>

                <Cell className="grid-12 section_item section_pool_box" colSpan={12}>
                    <ResponsiveGrid gap={80} className={'pool_box'} columns={2}>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'title'}>{intl.get('page.analytics.pool.title.call')}</div>
                            <div className={'chart_box'}>
                                <div className={'chart_available'} style={UnderwritingPoolVO.getCallAvailableAssetQuantityStyle()}>
                                </div>
                                <div className={'chart'} style={UnderwritingPoolVO.getCallUtilizationRatioStyle()}></div>
                            </div>
                            <div className={'overview'}>
                                <div className={'item'}>
                                    <div className={'t'}>{UnderwritingPoolVO.callUtilizationRatio}%</div>
                                    <div><span className={'d_ratio'}>{intl.get('page.analytics.pool.ratio')}</span></div>
                                </div>
                                <div className={'item m'}>
                                    <div className={'t'}>{UnderwritingPoolVO.callAvailableAssetQuantityShow} {AnalyticsVO.coinName}</div>
                                    <div><span className={'d_available'}>{intl.get('page.analytics.pool.available')}</span></div>
                                </div>
                                <div className={'item r'}>
                                    <div className={'t'}>{UnderwritingPoolVO.callTotalAssetShow} {AnalyticsVO.coinName}</div>
                                    <div><span className={'d_total'}>{intl.get('page.analytics.pool.total')}</span></div>
                                </div>
                            </div>
                        </Cell>
                        <Cell className="grid-1 section_item " colSpan={1}>
                            <div className={'title'}>{intl.get('page.analytics.pool.title.put')}</div>
                            <div className={'chart_box'}>
                                <div className={'chart_available'} style={UnderwritingPoolVO.getPutAvailableAssetQuantityStyle()}>
                                </div>
                                <div className={'chart'} style={UnderwritingPoolVO.getPutUtilizationRatioStyle()}></div>
                            </div>
                            <div className={'overview'}>
                                <div className={'item'}>
                                    <div className={'t'}>{UnderwritingPoolVO.putUtilizationRatio}%</div>
                                    <div><span className={'d_ratio'}>{intl.get('page.analytics.pool.ratio')}</span></div>
                                </div>
                                <div className={'item m'}>
                                    <div className={'t'}>{UnderwritingPoolVO.putAvailableAssetQuantityShow} {AnalyticsVO.coinName}</div>
                                    <div><span className={'d_available'}>{intl.get('page.analytics.pool.available')}</span></div>
                                </div>
                                <div className={'item r'}>
                                    <div className={'t'}>{UnderwritingPoolVO.putTotalAssetValueShow} USDT</div>
                                    <div><span className={'d_total'}>{intl.get('page.analytics.pool.total')}</span></div>
                                </div>
                            </div>
                        </Cell>
                    </ResponsiveGrid>
                </Cell>
            </ResponsiveGrid>
        );
    }
}

export default UnderwritingPool;
