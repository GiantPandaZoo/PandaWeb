/* eslint-disable new-cap */
import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';

import './index.scss';

import BuyOPA from "../../../../components/BuyOPA";

const {Cell} = ResponsiveGrid;

const SellBanner = () => {
    return (
        <section id="J_banner" className="section s_b_container">
            <div className="section_container">
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-6 section_item l" colSpan={6}>
                        <div className={'title sell'}>{intl.get('page.sell.banner.title')}</div>
                        <div className={'content'}>
                            {intl.getHTML('page.sell.banner.content')}
                        </div>
                        <div className={'btn'}>
                            <BuyOPA/>
                        </div>
                    </Cell>
                    <Cell className="grid-6 section_item r" colSpan={6}>
                        <div className={'content sell'}>
                        </div>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default SellBanner;
