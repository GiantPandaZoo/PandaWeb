import OptionTradingConfig from '../../etherscan/OptionTradingConfig';
import currentAccountStorage from "../Web3/CurrentAccountStorage";
import log from '../Log';
import {action, observable} from "mobx";

class AssetApprove {
    @observable already = false;

    allowance={};

    @action
    getAllowance(operationType) {
        log.debug('load allowance...');

        let _operationType=operationType||"Buy";
        let accountAllowance=this.allowance[currentAccountStorage.account];
        if(!accountAllowance){
            accountAllowance={};
            this.allowance[currentAccountStorage.account]=accountAllowance;
        }

        let finishArr=[];
        for(let config of OptionTradingConfig.approve[_operationType]){
            let contractConfig = OptionTradingConfig.contractConfig[config.assetType]["hotPotToken"];
            let contractAddress = contractConfig.address();
            let contractAbi = contractConfig.abi;

            let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

            let allowanceAddress=config.address();
            contract.methods
                .allowance(currentAccountStorage.account,allowanceAddress)
                .call()
                .then((result) => {
                    finishArr.push(allowanceAddress);
                    accountAllowance[allowanceAddress]=result;
                    log.info(`allowance:[assetType=${config.assetType},account=${currentAccountStorage.account},contractName=${config.contractDes},contractAddress=${allowanceAddress},allowance=${result}]`);

                    if(finishArr.length==OptionTradingConfig.approve[_operationType].length){
                        this.setAlready(true);
                    }
                });
        }
    }

    @action
    approve(optionContractAddress,callBack,operationType) {
        operationType=operationType||'Sell';
        let assetType="";

        for(let config of OptionTradingConfig.approve[operationType]){
            if(config.address()===optionContractAddress){
                assetType=config.assetType;
            }
        }

        let contractConfig = OptionTradingConfig.contractConfig[assetType]["hotPotToken"];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .approve(optionContractAddress,OptionTradingConfig.getDefaultApproveAllowance())
            .send({
                from: currentAccountStorage.account,
            })
            .then((result) => {
                log.debug("approve success!");
                callBack();
            });
    }

    batchRequestApproveAndCallback(optionContractAddress,callBackRequest) {
        let assetType="";

        for(let config of OptionTradingConfig.approve.Sell){
            if(config.address()===optionContractAddress){
                assetType=config.assetType;
            }
        }

        let contractConfig = OptionTradingConfig.contractConfig[assetType]["hotPotToken"];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        let approveRequest=contract.methods
            .approve(optionContractAddress,OptionTradingConfig.getDefaultApproveAllowance())
            .send.request(
                {from: currentAccountStorage.account},
                (result) => {
                    log.debug("approve success!");
                });

        let batch = new window.web3.BatchRequest();
        batch.add(approveRequest);
        batch.add(callBackRequest);
        batch.execute();
    }

    @action
    refresh(operationType){
        this.setAlready(false);
        this.getAllowance(operationType);
    }

    @action
    setAlready(already){
        this.already=already;
    }

    getContractAllowance(contractAddress){
        return this.allowance[currentAccountStorage.account][contractAddress];
    }
}

export default new AssetApprove()
