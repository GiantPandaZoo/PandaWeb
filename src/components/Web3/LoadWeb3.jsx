// //overrides metamask v0.2 for our 1.0 version.
//1.0 lets us use async and await instead of promises

import Web3 from 'web3';
import WebThreeLoadEvent from '../Web3/WebThreeLoadEvent';
import CurrentChainStorage from "./CurrentChainStorage";
import OptionTradingConfig from "../../etherscan/OptionTradingConfig";

const loadWeb3 = () => {
    if (!window.ethereum && !window.BinanceChain) {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');

        window.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
        CurrentChainStorage.setChainId(OptionTradingConfig.defaultChain.id);
        WebThreeLoadEvent.setLoadState(true);
    }
};

export default loadWeb3;
