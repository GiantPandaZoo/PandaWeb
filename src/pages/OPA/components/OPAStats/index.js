import './index.scss';

import React, {Component} from 'react';
import log from "../../../../components/Log";

import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";

import {observer} from "mobx-react";
import {ResponsiveGrid} from "@alifd/next";
import OPAStatsVO from "./OPAStatsVO";
import OPAStatsDAO from "./OPAStatsDAO";
import CurrentChainStorage from "../../../../components/Web3/CurrentChainStorage";

const { Cell } = ResponsiveGrid;

@observer
class OPAStats extends Component {
    componentDidMount() {
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && CurrentChainStorage.chainId){
                OPAStatsDAO.loadStats();
            }
        });
    }

    render() {
        return (
            <section className="section opa_stats_container">
                <div className="section_container opa_stats_section_container">
                    <ResponsiveGrid gap={20} className={''} columns={3}>
                        <Cell className="grid-1 section_item stats_item" colSpan={1}>
                            <div>
                                <span className={'s_value'}>{OPAStatsVO.priceShow}</span>
                                <span className={'s_unit'}>USD</span>
                            </div>
                            <div className={'item_des'}>OPA Price</div>
                        </Cell>
                        <Cell className="grid-1 section_item stats_item" colSpan={1}>
                            <div>
                                <span className={'s_value'}>{OPAStatsVO.marketCap}</span>
                                <span className={'s_unit'}>USD</span>
                            </div>
                            <div className={'item_des'}>OPA Market Cap</div>
                        </Cell>
                        <Cell className="grid-1 section_item stats_item" colSpan={1}>
                            <div>
                                <span className={'s_value'}>{OPAStatsVO.circSupplyShow}</span>
                                <span className={'s_unit'}>OPA</span>
                            </div>
                            <div className={'item_des'}>OPA Circ.Supply</div>
                        </Cell>
                    </ResponsiveGrid>
                </div>
            </section>
        );
    }
};

export default OPAStats;
