import log from '../../../../components/Log';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import PoolRewardsData from "./PoolRewardsData";
import PoolRewardsVO from "./PoolRewardsVO";
import getCoinIcon from "../Coin";
import RedeemRewardsVO from "./RedeemRewardsVO";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";
import AssetBalance from "../../../../components/AssetBalance";

class PoolRewardsDAO {
    loadPoolRewards(){
        log.debug(`loadPoolRewards...`);

        PoolRewardsVO.reset();

        let loadRewardsCallback=(poolRewards) => {
            if(poolRewards.callPoolRewardsShow && poolRewards.putPoolRewardsShow){
                PoolRewardsVO.addData(poolRewards);
            }
        };

        PoolRewardsVO.addLoadDataLength(OptionTradingConfig.coins.length);

        for(let coin of OptionTradingConfig.coins){
            let poolRewards=new PoolRewardsData();
            poolRewards.setAsset(coin.name);
            let assetIcon=`coin_icon ${getCoinIcon(coin.name)}`;
            poolRewards.setAssetIcon(assetIcon);

            this.doLoadPoolRewards(coin.name, 'callPoolContract', (rewards) => {
                poolRewards.setCallPoolRewards(rewards);
                loadRewardsCallback(poolRewards);
            });

            this.doLoadPoolRewards(coin.name, 'putPoolContract', (rewards) => {
                poolRewards.setPutPoolRewards(rewards);
                loadRewardsCallback(poolRewards);
            });
        }
    }

    doLoadPoolRewards(coinName, optionType, callBack){
        log.debug(`loadPoolRewards [coinName=${coinName},optionType=${optionType}] ...`);

        if(!OptionTradingConfig.contractConfig[coinName] || !OptionTradingConfig.contractConfig[coinName][optionType] || !OptionTradingConfig.contractConfig[coinName][optionType].address()){
            return;
        }

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .checkOPA(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`loadPoolRewards => checkOPA(${currentAccountStorage.account}) => result [coinName=${coinName}, optionType=${optionType}, pool=${contractAddress}, opa=${result}]`);
                callBack(result);
            });
    }

    claimPoolRewards(){
        log.debug(`claimPoolRewards [coinName=${RedeemRewardsVO.asset},optionType=${RedeemRewardsVO.currentPool}] ...`);

        let handler=this;

        let coinName=RedeemRewardsVO.asset, optionType=RedeemRewardsVO.currentPool;

        if(!OptionTradingConfig.contractConfig[coinName] || !OptionTradingConfig.contractConfig[coinName][optionType] || !OptionTradingConfig.contractConfig[coinName][optionType].address()){
            return;
        }

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .claimOPA()
            .send({
                from: currentAccountStorage.account,
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                RedeemRewardsVO.resetRewards();
                DialogBoxVO.success();
                AssetBalance.refresh();

                handler.loadPoolRewards();
            });
    }
}

export default new PoolRewardsDAO();
