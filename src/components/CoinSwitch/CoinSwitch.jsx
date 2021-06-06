import React from 'react';
import {Tab} from '@alifd/next';

import './index.scss';
import '../Theme/theme.scss';

const onChange = (key) => {
    console.log(key);
};

const CoinSwitch = () => {
    return (
        <div className={'coin_switch'}>
            <Tab onChange={onChange}>
                <Tab.Item title="BTC" key="BTC">BTC</Tab.Item>
                <Tab.Item title="ETH" key="ETH">ETH</Tab.Item>
                <Tab.Item title="BNB" key="BNB">BNB</Tab.Item>
            </Tab>
        </div>
    );
};

export default CoinSwitch;
