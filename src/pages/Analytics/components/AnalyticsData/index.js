import './index.scss';

import React from 'react';
import {ResponsiveGrid, Tab} from '@alifd/next';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import log from "../../../../components/Log";

import AnalyticsVO from './AnalyticsVO';
import UnderlyingAsset from './UnderlyingAsset';
import UnderwritingPool from './UnderwritingPool';
import UnderwritingPoolSnapshot from "./UnderwritingPoolSnapshot";

const {Cell} = ResponsiveGrid;

const onAnalyticsCoinChange = (key) => {
    log.debug(`select ${key} ...`);
    AnalyticsVO.setCoinName(key);
};

const AnalyticsData = () => {
    return (
        <section className="section trading_container analytics_container">
            <div className="section_container">
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-12 section_item" colSpan={12}>
                        <div className={'coin_switch'}>
                            <Tab onChange={onAnalyticsCoinChange} defaultActiveKey={OptionTradingConfig.defaultCoin}>
                                {OptionTradingConfig.coins.map(coin => (
                                    <Tab.Item title={coin.name} key={coin.name} className={coin.icon}/>
                                ))}
                            </Tab>
                        </div>
                    </Cell>
                </ResponsiveGrid>

                <UnderlyingAsset/>
                <UnderwritingPool/>
                <UnderwritingPoolSnapshot/>
            </div>
        </section>
    );
};

export default AnalyticsData;
