import React, {Component} from 'react';
import {ConnectWallet} from '@components'
import Logo from '../../../../components/Logo'
import HeaderVO from './HeaderVO';

import './index.scss';
import {observer} from "mobx-react";
import DialogBox from "../../../../components/DialogBox";
import {autorun} from "mobx";
import WebThreeLoadEvent from "../../../../components/Web3/WebThreeLoadEvent";
import CurrentChainStorage from "../../../../components/Web3/CurrentChainStorage";
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";

@observer
class Header extends Component {
    componentDidMount() {
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && CurrentChainStorage.chainId){
                if(CurrentChainStorage.chainId != OptionTradingConfig.defaultChain.id){
                    DialogBoxVO.confirm();
                    DialogBoxVO.setTitle('You Must Change Networks');

                    DialogBoxVO.setContent(`We've detected that you need to switch your wallet's network to ${OptionTradingConfig.defaultChain.name} for this Dapp.`);
                }else{
                    DialogBoxVO.setVisible(false);
                }
            }
        });
    }

    render() {
        return (
            <div className="header_container">
                <div className="section">
                    <DialogBox/>
                    <div className={'section_container header_item_container'}>
                        <div className={'h_i_c_l'}>
                            <div className={'logo_box'}>
                                <Logo/>
                                <div className={'audited_by'}>Audited by Slowmist</div>
                            </div>
                            <ul className="navs">
                                {
                                    HeaderVO.navArr.map(navItem => (
                                        <li key={navItem.key} className="nav_menu">
                                            <a href={navItem.url} className={navItem.className}>
                                                {navItem.nav}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="operations">
                            <ConnectWallet showAccount={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
