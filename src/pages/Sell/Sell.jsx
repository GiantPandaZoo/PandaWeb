/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Banner from './components/Banner';
import Pooler from './components/Pooler';
import HeaderVO from "../../layouts/DefaultLayout/components/Header/HeaderVO";

@withRouter
class Sell extends Component {
    componentDidMount(){
        HeaderVO.setCurrentNavKey('sell');
    }

    render() {
        return (
            <div className="sections">
                <Banner/>

                <Pooler/>
            </div>
        );
    }
}

export default Sell;
