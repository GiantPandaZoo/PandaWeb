/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Banner from './components/Banner';
import UseCases from "./components/UseCases";
import QA from "./components/QA";
import Trading from "./components/Trading";
import HeaderVO from "../../layouts/DefaultLayout/components/Header/HeaderVO";

@withRouter
class Home extends Component {
    componentDidMount(){
        HeaderVO.setCurrentNavKey('buy');
    }

    render() {
        return (
            <div className="sections">
                <Banner/>
                <UseCases/>
                <Trading/>
                <QA/>
            </div>
        );
    }
}

export default Home;
