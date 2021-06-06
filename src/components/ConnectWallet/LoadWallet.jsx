import './index.scss';

import React, { useState, useEffect } from 'react';
import {useWallet} from 'react-binance-wallet'
import CurrentAccountStorage from '../Web3/CurrentAccountStorage';
import log from '../Log/index';
import Web3 from 'web3';
import {Button, Input, NumberPicker, Overlay} from '@alifd/next';
import intl from 'react-intl-universal';
import WebThreeLoadEvent from "../Web3/WebThreeLoadEvent";
import CurrentChainStorage from "../Web3/CurrentChainStorage";
import DialogBoxVO from "../DialogBox/DialogBoxVO";
import OptionTradingConfig from "../../etherscan/OptionTradingConfig";

const LoadWallet = (props) => {
    const wallet = useWallet();
    const { account, connect, reset, status, library, error, balance, chainId, changeAccount, connector } = wallet;
    const [isShowWalletPop, showWalletPop] = useState(false);

    const connectWallet = (walletName) => {
        if (window.ethereum || window.BinanceChain) {
            log.debug(`connectWallet, walletName => ${walletName}`);
            connect(walletName);
            saveToSession("CURRENT_WALLET",walletName);
            saveToSession("AUTO_CONNECT",'true');
        }else{
            DialogBoxVO.confirm();
            DialogBoxVO.setTitle('Select a Wallet');

            DialogBoxVO.setContent(`You'll need to install "MetaMask" or "Binance Chain Wallet" to continue. Once you have it installed, go ahead and refresh the page.`);
        }
    };

    const disconnectWallet=async () => {
        saveToSession("AUTO_CONNECT",'false');
        CurrentAccountStorage.clearAccount();
        await reset();
    };

    const saveToSession=(key,value)=>{
        if (window.localStorage) {
            let storage = window.localStorage;
            storage.setItem(key, value);
        }
    };

    const getFromSession=(key)=>{
        if (window.localStorage) {
            let storage = window.localStorage;
            return storage.getItem(key);
        }
        return '';
    };

    useEffect(() => {
        log.info(`useEffect: account => ${account}`);

        if(!account && getFromSession('AUTO_CONNECT')==='true'){
            setTimeout(()=>{
                connectWallet(getFromSession("CURRENT_WALLET") || 'injected');
            },500);
        }

        if(account){
            CurrentAccountStorage.setAccount(account);
        }
    }, [account]);

    useEffect(() => {
        log.info(`useEffect: library => ${library}, chainId => ${chainId}`);

        if(library && chainId){
            window.web3 = new Web3(library);
            CurrentChainStorage.setChainId(chainId);

            WebThreeLoadEvent.setLoadState(true);
        }
    }, [library,chainId]);

    useEffect(() => {
        log.info(`useEffect: error => ${error}, message => ${error?.message}`);
        if(error && error.message==='Unsupported chain'){
            DialogBoxVO.confirm();
            DialogBoxVO.setTitle('You Must Change Networks');

            DialogBoxVO.setContent(`We've detected that you need to switch your wallet's network to ${OptionTradingConfig.defaultChain.name} for this Dapp.`);

            disconnectWallet();
        }

        if(error && error.message==='No BSC provider was found on window.BinanceChain.'){
            DialogBoxVO.confirm();
            DialogBoxVO.setTitle('The Binance Chain Wallet package is not installed.');

            DialogBoxVO.setContent(`You'll need to install "Binance Chain Wallet" to continue. Once you have it installed, go ahead and refresh the page.`);

            disconnectWallet();
        }

        if(error && error.message==='No Ethereum provider was found on window.ethereum.'){
            DialogBoxVO.confirm();
            DialogBoxVO.setTitle('The MetaMask Wallet package is not installed.');

            DialogBoxVO.setContent(`You'll need to install "MetaMask" to continue. Once you have it installed, go ahead and refresh the page.`);

            disconnectWallet();
        }
    }, [error,chainId]);

    return (
        <div>
            {status === 'disconnected' ? (
                <>
                    <Overlay visible={isShowWalletPop}
                        // safeNode={() => this.btn}
                             align="cc cc"
                             hasMask
                             disableScroll className={'overlay_container wallet_pop_windows'}>
                        <div className={'pop_wallet_box'}>
                            <div className={'wallet_item'} onClick={connectWallet.bind(this,'injected')}>
                                <div className={'wallet_icon icon_metamask'}></div>
                                <div className={'wallet_name'}>MetaMask</div>
                                <div className={'des'}>Connect to your MetaMask Wallet</div>
                            </div>

                            <div className={'wallet_item'} onClick={connectWallet.bind(this,'bsc')}>
                                <div className={'wallet_icon icon_bsc'}></div>
                                <div className={'wallet_name'}>Binance Chain Wallet</div>
                                <div className={'des'}>Connect to your Binance Chain Wallet</div>
                            </div>
                        </div>
                    </Overlay>
                    <Button type="primary" size="large" onClick={showWalletPop.bind(this,true)} className={`sub_btn ${props.customBtnClass||''}`}>
                        {intl.get('commons.connectWallet')}
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        type="primary"
                        size="large"
                        onClick={disconnectWallet.bind(this)}
                        className={`sub_btn ${props.customDisBtnClass||''}`}
                    >
                        {intl.get('commons.disconnectWallet')}
                    </Button>
                </>
            )}
        </div>
    );
};

export default LoadWallet;
