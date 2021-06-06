/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Banner from './components/Banner';
import AnalyticsData from './components/AnalyticsData';
import HeaderVO from "../../layouts/DefaultLayout/components/Header/HeaderVO";

@withRouter
class Analytics extends Component {
    componentDidMount(){
        HeaderVO.setCurrentNavKey('analytics');
    }

    render() {
        return (
            <div className="sections">
                <Banner/>

                <AnalyticsData/>
            </div>
        );
    }
}

export default Analytics;
