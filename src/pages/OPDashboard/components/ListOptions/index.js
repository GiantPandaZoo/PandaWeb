import './index.scss';

import React from 'react';
import {Button, ConfigProvider, ResponsiveGrid, Table} from '@alifd/next';
import log from "../../../../components/Log";

import ListOptionsVO from './ListOptionsVO';
import ListOptionsDAO from './ListOptionsDAO';

import {NextComponentLocaleConfig} from "../../../../components";
import DialogBox from "../../../../components/DialogBox";

const {Cell} = ResponsiveGrid;

const updateOptionPool = (pool) => {
    ListOptionsDAO.updateOptionPool(pool);
};

const optionPoolOperationRender = (value, index, record) => {
    return <Button type="primary" onClick={updateOptionPool.bind(this,record)} size="small" className="sub_btn">Update</Button>;
};

const ListOptions = () => {
    return (
        <section className="section dashboard_container">
            <div className="section_container">
                <DialogBox/>

                <ResponsiveGrid gap={20} className={'analytics_item section_dashboard_box table_container'}>
                    <Cell className="grid-12 section_item section_title" colSpan={12}>
                        Underwriting Pool
                    </Cell>

                    <Cell className="grid-12 section_item section_pool_snapshot_box" colSpan={12}>
                        <ConfigProvider locale={NextComponentLocaleConfig}>
                            <Table dataSource={ListOptionsVO.dataArr} loading={ListOptionsVO.isLoading}>
                                <Table.Column title={'Asset'} dataIndex="asset" className={'type'}/>
                                <Table.Column title={'Pool'} dataIndex="pool" className={'duration'}/>
                                <Table.Column cell={optionPoolOperationRender}/>
                            </Table>
                        </ConfigProvider>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default ListOptions;
