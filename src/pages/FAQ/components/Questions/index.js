import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import QuestionsTitle from './QuestionsTitle';

import './index.scss';

const {Cell} = ResponsiveGrid;

const Questions = () => {
    return (
        <section id={'J_FAQ_title_container'} className="section p_q_t_container">
            <div className="section_container">
                <ResponsiveGrid gap={40} columns={2}>
                    <Cell className="grid-2 section_item" colSpan={2}>
                        <a name="QA_Top"></a>
                        <div className={'qa_page_title'}>Frequently Asked Questions</div>
                    </Cell>
                </ResponsiveGrid>
            </div>
            <div className="section_container section_container_title">
                <QuestionsTitle/>
            </div>
        </section>
    );
};

export default Questions;
