/* eslint-disable new-cap */
import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';

import './index.scss';

import {ConnectWallet} from '@components';

const {Cell} = ResponsiveGrid;

const SellBanner = () => {
    return (
        <section id="J_banner" className="section b_container a_b_container">
            <div className="section_container">
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-6 section_item l" colSpan={6}>
                        <div className={'title'}>{intl.get('page.analytics.banner.title')}</div>
                        <div className={'content'}>
                            {intl.getHTML('page.analytics.banner.content')}
                        </div>
                        <div className={'btn'}>
                            <ConnectWallet/>
                        </div>
                    </Cell>
                    <Cell className="grid-6 section_item r" colSpan={6}>
                        <div className={'content'}>
                        </div>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default SellBanner;
