/* eslint-disable new-cap */
import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';

import './index.scss';

import BuyOPA from "../../../../components/BuyOPA";

const {Cell} = ResponsiveGrid;

const Banner = () => {
    return (
        <section id="J_banner" className="section b_container b_container_home">
            <div className="section_container">
                <ResponsiveGrid gap={0}>
                    <Cell className="grid-6 section_item l" colSpan={6}>
                        <div className={'title home'}>{intl.getHTML('page.home.banner.title')}</div>
                        <div className={'content'}>
                            {intl.get('page.home.banner.content')}
                        </div>
                        <div className={'btn'}>
                            <BuyOPA/>
                        </div>
                    </Cell>
                    <Cell className="grid-6 section_item r" colSpan={6}>
                        <div className={'content home'}>
                        </div>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default Banner;
