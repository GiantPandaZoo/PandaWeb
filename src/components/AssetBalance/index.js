import OptionTradingConfig from '../../etherscan/OptionTradingConfig';
import currentAccountStorage from "../Web3/CurrentAccountStorage";
import log from '../Log';
import {action, autorun, observable} from "mobx";
import web3 from "../Web3/GetWeb3";
import WebThreeLoadEvent from "../Web3/WebThreeLoadEvent";

class AssetBalance {
    @observable already = false;

    balance={};

    constructor(){
        autorun(() => {
            if(WebThreeLoadEvent.isLoaded && currentAccountStorage.account){
                this.refresh();
            }
        });
    }

    @action
    loadBalance() {
        log.debug('load balance...');

        let accountBalance=this.balance[currentAccountStorage.account];
        if(!accountBalance){
            accountBalance={};
            this.balance[currentAccountStorage.account]=accountBalance;
        }

        let finishArr=[];
        for(let assetConfig of OptionTradingConfig.assets){
            let asset=assetConfig.name;
            let handler=this;
            let getBalanceCallback=(balance)=>{
                finishArr.push(asset);
                accountBalance[asset]=balance;
                log.info(`balance:[account=${currentAccountStorage.account},asset=${asset},balance=${balance}]`);

                if(finishArr.length===OptionTradingConfig.assets.length){
                    handler.setAlready(true);
                }
            };

            if(asset===OptionTradingConfig.nativeAsset.getNativeAsset()){
                this.getNativeAssetBalance(getBalanceCallback);
            }else{
                let contractConfig = OptionTradingConfig.contractConfig[asset]["hotPotToken"];
                let contractAddress = contractConfig.address();
                let contractAbi = contractConfig.abi;

                let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

                contract.methods
                    .balanceOf(currentAccountStorage.account)
                    .call()
                    .then(getBalanceCallback);
            }
        }
    }

    getNativeAssetBalance(getBalanceCallback){
        web3().getBalance(currentAccountStorage.account).then(getBalanceCallback);
    }

    @action
    refresh(){
        this.setAlready(false);
        this.loadBalance();
    }

    @action
    setAlready(already){
        this.already=already;
    }

    getAssetBalance(asset){
        return this.balance[currentAccountStorage.account][asset];
    }
}

export default new AssetBalance()
