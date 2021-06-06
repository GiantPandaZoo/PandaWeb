/* eslint-disable new-cap */
import React from 'react';
import {ResponsiveGrid, Tab} from '@alifd/next';
import intl from 'react-intl-universal';

import './index.scss';

import {ConnectWallet} from '@components';
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";
import PoolerForm from './PoolerForm';
import PoolerVO from "./PoolerVO";
import log from '../../../../components/Log';
import DialogBox from "../../../../components/DialogBox";
import Profit from "./Profit";

const {Cell} = ResponsiveGrid;

const SellCoinTab =({ name, icon }) =>{
    return (
        <div className="coin_tab_item">
            <div className={icon}>{intl.get(`page.sell.pooler.coin.name.${name}`)}</div>
            <div className="tab_desc">{intl.get(`page.sell.pooler.coin.desc.${name}`)}</div>
        </div>
    );
};

const onCoinChange = (key) => {
    log.debug(`coin switch=>${key}`);
    PoolerVO.setCoinName(key);
};

const Pooler = () => {
    return (
        <section id="J_pooler" className="section pooler_container">
            <DialogBox/>
            <div className="section_container">
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-12 section_item" colSpan={12}>
                        <div className={'coin_switch'}>
                            <Tab defaultActiveKey={OptionTradingConfig.defaultCoin} onChange={onCoinChange} tabRender={(key, props) => <SellCoinTab key={key} {...props} />}>
                                {OptionTradingConfig.coins.map(coin => (
                                    <Tab.Item key={coin.name} {...coin}/>
                                ))}
                            </Tab>
                        </div>
                    </Cell>
                </ResponsiveGrid>

                <PoolerForm/>
                <Profit/>
            </div>
        </section>
    );
};

export default Pooler;
