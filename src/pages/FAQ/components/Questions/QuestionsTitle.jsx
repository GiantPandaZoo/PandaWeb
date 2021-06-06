import React, {Component} from 'react';
import {ResponsiveGrid} from '@alifd/next';
import intl from 'react-intl-universal';
import QuestionsConfig_en from '../QuestionsConfig_en';

import './index.scss';

const {Cell} = ResponsiveGrid;

class QuestionsTitle extends Component {
    render() {
        return (
            <ResponsiveGrid gap={40} columns={2}>
                <Cell className="grid-1 section_item section_item_l" colSpan={1}>
                    <div className={'qa_title_container'}>
                        {
                            QuestionsConfig_en.titles.l.map((title, index) => {
                                return (
                                    <a key={index} href={`#question${title.index}`}>
                                        <div className={'qa_question'}>
                                            <div className={'index'}>{title.index}</div>
                                            <div className={'title'}>{title.title}</div>
                                            <div className={'arrow'}></div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </Cell>
                <Cell className="grid-1 section_item section_item_r" colSpan={1}>
                    <div className={'qa_title_container'}>
                        {
                            QuestionsConfig_en.titles.r.map((title, index) => {
                                return (
                                    <a key={index} href={`#question${title.index}`}>
                                        <div className={'qa_question'}>
                                            <div className={'index'}>{title.index}</div>
                                            <div className={'title'}>{title.title}</div>
                                            <div className={'arrow'}></div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </Cell>
                <Cell className="grid-1 section_item" colSpan={2}>
                    <div className={'qa_title_container'}>
                        <div className={'more'}>
                            <a href={'https://docs.opanda.io/'} target={'_blank'} className={'more_link'}>{intl.get('page.faq.more.link')}</a>
                        </div>
                    </div>
                </Cell>
            </ResponsiveGrid>
        );
    }
}

export default QuestionsTitle;
