import React from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';
import QuestionsAnswer from './QuestionsAnswer';

import './index.scss';

const {Cell} = ResponsiveGrid;

const Answers = () => {
    return (
        <section className="section p_q_a_container">
            <div className="section_container">
                <QuestionsAnswer/>
            </div>
        </section>
    );
};

export default Answers;
