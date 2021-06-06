import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';

import './index.scss';

const {Cell} = ResponsiveGrid;

const QA = () => {
    return (
        <section id="J_qa" className="section qa_container">
            <div className="section_container">
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-12 section_item section_title module_title" colSpan={12}>
                        {intl.get('page.home.qa.sectionTitle')}
                    </Cell>

                    <Cell className="grid-12 section_item qa_section_item" colSpan={12}>
                        <div className="title">{intl.get('page.home.qa.item1.title')}</div>
                        <div className="section_content">
                            {intl.getHTML('page.home.qa.item1.content')}
                        </div>
                    </Cell>
                    <Cell className="grid-12 section_item qa_section_item" colSpan={12}>
                        <div className="title">{intl.get('page.home.qa.item2.title')}</div>
                        <div className="section_content">
                            {intl.getHTML('page.home.qa.item2.content')}
                        </div>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default QA;
