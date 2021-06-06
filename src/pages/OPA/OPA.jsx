/* eslint react/no-string-refs:0 */
import './index.scss';

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PoolRewards from "./components/PoolRewards";
import DAOStaking from "./components/DAOStaking";
import LPStaking from "./components/LPStaking";
import HeaderVO from "../../layouts/DefaultLayout/components/Header/HeaderVO";
import OPAStats from "./components/OPAStats";
import DialogBox from "../../components/DialogBox";
import {autorun} from "mobx";
import WebThreeLoadEvent from "../../components/Web3/WebThreeLoadEvent";
import currentAccountStorage from "../../components/Web3/CurrentAccountStorage";
import AssetApprove from "../../components/AssetApprove";


@withRouter
class OPDashboard extends Component {
    componentDidMount(){
        HeaderVO.setCurrentNavKey('opa');

        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                AssetApprove.getAllowance("OPA");
            }
        });
    }

    render() {
        return (
            <div className="sections">
                <DialogBox/>
                <OPAStats/>
                <PoolRewards/>
                <DAOStaking/>
                <LPStaking/>
            </div>
        );
    }
}

export default OPDashboard;
