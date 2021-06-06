import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import PoolerVO from './PoolerVO';
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import BigNumberConvert from "../../../../components/BigNumberConvert";
import AssetApprove from "../../../../components/AssetApprove";
import AssetBalance from "../../../../components/AssetBalance";
import log from "../../../../components/Log";
import BigNumber from 'bignumber.js'
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";
import ProfitVO from "./ProfitVO";
import ProfitData from "./ProfitData";
import ProfitWithdrawVO from "./ProfitWithdrawVO";
import ApplicationConfig from "../../../../ApplicationConfig";

class PoolerDAO {
    loadBalance(){
        log.debug(`loadBalance... [PoolerVO.coinName=${PoolerVO.coinName},PoolerVO.optionType=${PoolerVO.optionType},PoolerVO.depositCoinName=${PoolerVO.depositCoinName}]`);

        PoolerVO.reset();
        let balance=AssetBalance.getAssetBalance(PoolerVO.depositCoinName);
        PoolerVO.setBalanceOf(balance);
    }

    async checkAllowanceBeforeDeposit(){
        DialogBoxVO.confirm();

        if(PoolerVO.coinName==OptionTradingConfig.nativeAsset.getNativeAsset() && PoolerVO.isCallOptionType()){
            log.debug(`${OptionTradingConfig.nativeAsset.getNativeAsset()} Call...`);
            await this.deposit(this);
        }else{
            let putContractConfig=OptionTradingConfig.contractConfig[PoolerVO.coinName][PoolerVO.optionType];
            let allowance=AssetApprove.getContractAllowance(putContractConfig.address());
            let allowanceNb=new BigNumber(allowance);
            let defaultApproveThresholdNb=new BigNumber(OptionTradingConfig.getDefaultApproveThreshold());
            log.debug(`allowanceNb => ${allowanceNb.toFormat()}`);
            log.debug(`defaultApproveThresholdNb => ${defaultApproveThresholdNb.toFormat()}`);

            let isNeedApprove=allowanceNb.lt(defaultApproveThresholdNb);
            log.debug(`isNeedApprove => ${isNeedApprove}`);
            if(isNeedApprove){
                await AssetApprove.approve(putContractConfig.address(), ()=>{
                    this.deposit(this);
                });
                // await AssetApprove.batchRequestApproveAndCallback(putContractConfig.address(), this.buildDepositRequest());
            }else{
                await this.deposit(this);
            }
        }
    }

    loadRoundAccPremiumShare(handler, profitData, callback){
        let coinName = profitData.coinName;
        let optionType = profitData.poolType;

        let optionPoolContractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let optionPoolContractAddress = optionPoolContractConfig.address();
        let optionPoolContractAbi = optionPoolContractConfig.abi;
        let optionPoolContract = new window.web3.eth.Contract(optionPoolContractAbi, optionPoolContractAddress);

        handler.loadAssetPrice(optionPoolContract, profitData, (price) => {
            optionPoolContract.methods
                .listOptions()
                .call()
                .then((optionArr) => {
                    let loadedCount=0;
                    let roundAccPremiumShare=0;
                    for (let address of optionArr) {
                        handler.loadOptionRoundAccPremiumShare(address, optionPoolContractAddress, price, handler, profitData, (optionRoundAccPremiumShare) => {
                            loadedCount++;
                            roundAccPremiumShare+=optionRoundAccPremiumShare;
                            if(loadedCount>=optionArr.length){
                                log.debug(`roundAccPremiumShareTotal => ${roundAccPremiumShare}`);
                                profitData.setAPR(roundAccPremiumShare);
                                callback(profitData);
                            }
                        });
                    }
                });
        });
    }

    loadAssetPrice(optionPoolContract, profitData, callback){
        if(profitData.isCallOptionType()){
            optionPoolContract.methods
                .getAssetPrice()
                .call()
                .then((result)=>{
                    let price=BigNumberConvert.toShowNumberDecimalUSDT(result);
                    log.debug(`loadAssetPrice result => ${result}, price => ${price}`);
                    callback(price);
                });
        }else{
            callback(1);
        }
    }

    // (( getRoundAccPremiumShare(r-1) - getRoundAccPremiumShare(r-2) ) / 1e18 /asset_price * (24*60/5分钟)*365天*100%
    loadOptionRoundAccPremiumShare(optionAddress,optionPoolContractAddress, price, handler, profitData, callback){
        let coinName = profitData.coinName;

        let contractConfig = OptionTradingConfig.contractConfig[coinName].optionContract;
        let contractAddress = optionAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .getRound()
            .call()
            .then((currentRound) => {
                log.debug(`loadOptionRoundAccPremiumShare -> getRound: result => ${currentRound}`);
                if(currentRound>2){
                    handler.loadOptionDuration(contract, (duration) => {
                        handler.doLoadOptionRoundAccPremiumShare(contract,currentRound-1, (lastRoundAccPremiumShare) => {
                            handler.doLoadOptionRoundAccPremiumShare(contract,currentRound-2, (lastLastRoundAccPremiumShare) => {
                                let roundCount=24 * 60 / duration;
                                let optionRoundAccPremiumShare=((lastRoundAccPremiumShare-lastLastRoundAccPremiumShare) / price * roundCount) * 365 * 100;
                                log.debug(`roundAccPremiumShare => [coinName=${profitData.coinName},poolType=${profitData.poolType},duration=${duration},lastRoundAccPremiumShare=${lastRoundAccPremiumShare}, lastLastRoundAccPremiumShare=${lastLastRoundAccPremiumShare}, price=${price}, roundCount=${roundCount}]`);
                                log.debug(`optionRoundAccPremiumShare => ${optionRoundAccPremiumShare}`);
                                callback(optionRoundAccPremiumShare);
                            });
                        });
                    });
                }else{
                    callback(0);
                }
            });
    }

    doLoadOptionRoundAccPremiumShare(contract, round, callback){
        contract.methods
            .getRoundAccPremiumShare(round)
            .call()
            .then((result) => {
                let scale='0.000000000000000001';
                let value=BigNumberConvert.timesToNumber(result,scale, 6);
                log.debug(`doLoadOptionRoundAccPremiumShare -> getRoundAccPremiumShare: result => ${result} value => ${value}`);
                callback(value);
            });
    }

    loadOptionDuration(contract, callback){
        contract.methods
            .getDuration()
            .call()
            .then((result) => {
                let duration=result / 60;
                log.debug(`loadOptionDuration result => ${result}, duration => ${duration}`);
                callback(duration);
            });
    }

    buildDepositRequest(){
        let coinName = PoolerVO.coinName;
        let optionType = PoolerVO.optionType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let depositMethod = contractConfig.depositMethod;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        log.debug(`Deposit quantity(primitive) => ${PoolerVO.quantity}`);
        log.debug(`Deposit quantity => ${PoolerVO.quantityWei}`);

        let handler=this;
        let depositCallBack=()=>{
            DialogBoxVO.success();

            log.debug("deposit success!");
            AssetBalance.refresh();
            AssetApprove.refresh("Sell");
            handler.loadInvestment();
        };

        let send=contract.methods[depositMethod]
            .call(contract.methods,PoolerVO.quantityWei)
            .send;
        return send.request({
            from: currentAccountStorage.account
        }, depositCallBack);
    }

    async deposit(handler){
        let coinName = PoolerVO.coinName;
        let optionType = PoolerVO.optionType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let depositMethod = contractConfig.depositMethod;

        let contract = await new window.web3.eth.Contract(contractAbi, contractAddress);

        log.debug(`Deposit quantity(primitive) => ${PoolerVO.quantity}`);
        log.debug(`Deposit quantity => ${PoolerVO.quantityWei}`);

        let depositCallBack=()=>{
            DialogBoxVO.success();

            log.debug("deposit success!");
            AssetBalance.refresh();
            AssetApprove.refresh("Sell");
            handler.loadMyProfit();
        };

        let additionalChargeWei=BigNumberConvert.toPrimitiveValue(ApplicationConfig.poolerAdditionalChargeFee,OptionTradingConfig.nativeAsset.getNativeAsset());

        if(PoolerVO.depositCoinName===OptionTradingConfig.nativeAsset.getNativeAsset()){
            let depositValue=BigNumberConvert.plusAndToString(PoolerVO.quantityWei, additionalChargeWei);
            await contract.methods
                .deposit()
                .send({
                    from: currentAccountStorage.account,
                    value: depositValue
                })
                .on('error', function(error){
                    DialogBoxVO.failed();
                    DialogBoxVO.setContent(error.message);
                })
                .then(depositCallBack);
        }else{
            await contract.methods[depositMethod]
                .call(contract.methods,PoolerVO.quantityWei)
                .send({
                    from: currentAccountStorage.account,
                    value: additionalChargeWei
                })
                .on('error', function(error){
                    DialogBoxVO.failed();
                    DialogBoxVO.setContent(error.message);
                })
                .then(depositCallBack);
        }
    }

    loadMyProfit(){
        log.debug(`loadMyProfit...`);
        if(ProfitVO.isCallLoading || ProfitVO.isPutLoading){
            return;
        }

        let coinsConfig=OptionTradingConfig.coins;
        // let coinsConfig=[
        //     {
        //         name: 'BNB',
        //         icon: 'icon_bnb',
        //     },
        // ];

        ProfitVO.reset();
        ProfitVO.addCallLoadDataLength(coinsConfig.length);
        ProfitVO.addPutLoadDataLength(coinsConfig.length);

        let handler=this;

        for (let coinConfig of coinsConfig) {
            let coinName = coinConfig.name;

            let callProfitData=new ProfitData();
            callProfitData.setCoinName(coinName);

            let callOptionType = 'callPoolContract';
            callProfitData.setPoolType(callOptionType);

            handler.loadInvestment(callProfitData, (callProfitData) => {
                ProfitVO.addCallData(callProfitData);
            });


            let putProfitData=new ProfitData();
            putProfitData.setCoinName(coinName);

            let putOptionType = 'putPoolContract';
            putProfitData.setPoolType(putOptionType);

            handler.loadInvestment(putProfitData, (putProfitData) => {
                ProfitVO.addPutData(putProfitData);
            });
        }
    }

    loadInvestment(profitData, callback){
        log.debug(`loadInvestment... [coinName=${profitData.coinName},poolType=${profitData.poolType},assetName=${profitData.assetName}]`);

        let handler=this;
        handler.loadPoolerTokenAddress(profitData, address => {
            let coinName = profitData.coinName;
            let optionType = profitData.poolType;

            let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType]["poolerToken"];
            let contractAddress = address;
            let contractAbi = contractConfig.abi;
            let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
            contract.methods
                .balanceOf(currentAccountStorage.account)
                .call()
                .then((result)=>{
                    log.debug(`loadInvestment success,[balanceOf=${result}, poolAddress=${address}]`);
                    profitData.setAssetQuantity(result);

                    handler.loadAssetAvailableQuantity(profitData, profitData => {
                        handler.loadTotalInPool(profitData, profitData => {
                            handler.loadIncomeQuantity(profitData, profitData => {
                                handler.loadRoundAccPremiumShare(handler, profitData, callback);
                            });
                        });
                    });
                });
        });
    }

    loadPoolerTokenAddress(profitData, callback){
        log.debug(`loadPoolerTokenAddress... [coinName=${profitData.coinName},poolType=${profitData.poolType},assetName=${profitData.assetName}]`);

        let coinName = profitData.coinName;
        let optionType = profitData.poolType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods["poolerTokenContract"]
            .call(contract.methods)
            .call()
            .then((address)=>{
                log.debug(`loadPoolerTokenAddress... result=>${address}`);
                callback(address);
            });
    }

    loadAssetAvailableQuantity(profitData, callback){
        let coinName = profitData.coinName;
        let optionType = profitData.poolType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods["NWA"]
            .call(contract.methods)
            .call()
            .then((result)=>{
                profitData.setAssetAvailableQuantity(result);
                callback(profitData);
            });
    }

    loadTotalInPool(profitData, callback){
        let coinName = profitData.coinName;
        let optionType = profitData.poolType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods["collateral"]
            .call(contract.methods)
            .call()
            .then((result)=>{
                log.debug(`loadTotalInPool result => ${result}`);
                profitData.setAssetPoolQuantity(result);
                // profitData.setAssetPoolQuantity("5100000000000000");
                profitData.setWithdrawAbleQuantity();

                callback(profitData);
            });
    }

    loadIncomeQuantity(profitData, callback){
        log.debug(`loadIncomeQuantity... [coinName=${profitData.coinName},poolType=${profitData.poolType},incomeAssetCoinName=${profitData.incomeAssetCoinName}]`);

        let coinName = profitData.coinName;
        let optionType = profitData.poolType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .checkPremium(currentAccountStorage.account)
            .call()
            .then((result)=>{
                profitData.setIncomeQuantity(result);

                callback(profitData);
            });
    }

    withdraw(){
        log.debug(`withdraw... [coinName=${ProfitWithdrawVO.coinName},optionType=${ProfitWithdrawVO.poolType},withdrawQuantity=${ProfitWithdrawVO.withdrawQuantity},withdrawQuantityInt=${ProfitWithdrawVO.withdrawQuantityInt}]`);

        let handler=this;

        let coinName = ProfitWithdrawVO.coinName;
        let optionType = ProfitWithdrawVO.poolType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let withdrawMethod = contractConfig.withdrawMethod;
        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        let additionalChargeWei=BigNumberConvert.toPrimitiveValue(ApplicationConfig.poolerAdditionalChargeFee,OptionTradingConfig.nativeAsset.getNativeAsset());
        contract.methods[withdrawMethod]
            .call(contract.methods, ProfitWithdrawVO.withdrawQuantityInt)
            .send({
                from: currentAccountStorage.account,
                value: additionalChargeWei
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result)=>{
                DialogBoxVO.success();

                log.debug("withdraw success!");
                ProfitWithdrawVO.setShowWithdrawDialog(false);
                AssetBalance.refresh();
                handler.loadMyProfit();
            });
    }

    claim(profitData){
        log.debug(`claim... [coinName=${profitData.coinName},optionType=${profitData.poolType}]`);

        let handler=this;

        let coinName = profitData.coinName;
        let optionType = profitData.poolType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .claimPremium()
            .send({
                from: currentAccountStorage.account
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result)=>{
                DialogBoxVO.success();

                log.debug("claim success!");
                AssetBalance.refresh();
                handler.loadMyProfit();
            });
    }
}

export default new PoolerDAO();
