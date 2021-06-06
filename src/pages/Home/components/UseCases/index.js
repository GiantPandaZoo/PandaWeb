import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';
import Device from '../../../../components/Device';

import './index.scss';

const {Cell} = ResponsiveGrid;

const UseCases = () => {
    return (
        <section id="J_useCases" className="section u_container">
            <div className="section_container">
                <ResponsiveGrid gap={10} device={Device.deviceType}>
                    <Cell className="grid-2 section_item u_section_item" colSpan={2}>
                        <div className={'buyer'}>
                            <div className="u_s_i_item buyer_icon"/>
                        </div>
                    </Cell>
                    <Cell className="grid-4 section_item u_section_item uc_content" colSpan={4}>
                        <div className={'buyer'}>
                            <div className="u_s_i_item title">{intl.get('page.home.userCase.buyer.title')}</div>
                            <div className="u_s_i_item section_content des">
                                {intl.get('page.home.userCase.buyer.content')}
                            </div>
                        </div>
                    </Cell>
                    <Cell className="grid-2 section_item u_section_item" colSpan={2}>
                        <div className={'pooler'}>
                            <div className="u_s_i_item poller_icon"/>
                        </div>
                    </Cell>
                    <Cell className="grid-4 section_item u_section_item uc_content" colSpan={4}>
                        <div className={'pooler'}>
                            <div className="u_s_i_item title">{intl.get('page.home.userCase.poller.title')}</div>
                            <div className="u_s_i_item section_content des">
                                {intl.get('page.home.userCase.poller.content')}
                            </div>
                        </div>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default UseCases;
