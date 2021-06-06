import './index.scss';

import React from 'react';
import {ResponsiveGrid, Tab} from '@alifd/next';
import TradingForm from "./TradingForm";
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import OptionTradingVOList from './OptionTradingDTOList';
import Profit from "./Profit";
import MyOptionContracts from "./MyOptionContracts";
import DialogBox from "../../../../components/DialogBox";
import ProfitChart from "./ProfitChart";

const {Cell} = ResponsiveGrid;

const onChange = (key) => {
    OptionTradingVOList.setCoinName(key);
};

const Trading = () => {
    return (
        <section id="J_trading" className="section trading_container">
            <DialogBox/>
            <div className="section_container">
                <a name="BUY"></a>
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-12 section_item" colSpan={12}>
                        <div className={'coin_switch'}>
                            <Tab onChange={onChange} defaultActiveKey={OptionTradingConfig.defaultCoin}>
                                {OptionTradingConfig.coins.map(coin => (
                                    <Tab.Item title={coin.name} key={coin.name} className={coin.icon}/>
                                ))}
                            </Tab>
                        </div>
                    </Cell>
                </ResponsiveGrid>

                <TradingForm/>
                {/*<ProfitChart/>*/}
                <Profit/>
                <MyOptionContracts/>
            </div>
        </section>
    );
};

export default Trading;
