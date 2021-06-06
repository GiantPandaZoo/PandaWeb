import './index.scss';
import '../Coin/index.scss';

import React, {Component} from 'react';
import {Button, Overlay} from '@alifd/next';

import {observer} from "mobx-react";
import PopConnectWalletVO from "./PopConnectWalletVO";
import ConnectWallet from "../../../../components/ConnectWallet/ConnectWallet";

const closePopConnectDialog=()=>{
    PopConnectWalletVO.setShow(false);
};

@observer
class PopConnectWallet extends Component {
    render() {
        return (
            <Overlay visible={PopConnectWalletVO.show}
                // safeNode={() => this.btn}
                     align="cc cc"
                     hasMask
                     disableScroll className={'overlay_container opa_pop_windows opa_connect_wallet_pop_windows'}>
                <div>
                    <div className={'item title'}>Connect Wallet</div>
                    <div className={'item connect_tips'}>Please connect a wallet to start using this Dapp.</div>
                    <div className={'item sub_btn_box'}>
                        <Button type="primary" size="large" onClick={closePopConnectDialog} className="sub_btn cancel">CANCEL</Button>
                        <ConnectWallet customBtnClass={'confirm'}/>
                    </div>
                </div>
            </Overlay>
        );
    }
};

export default PopConnectWallet;
