import OptionTradingDTO from './OptionTradingDTO';
import OptionTradingVOList from './OptionTradingDTOList';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import OptionTradingVO from './OptionTradingVO';
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import log from '../../../../components/Log';
import ProfitVO from './ProfitVO'
import MyOptionContractsVO from "./MyOptionContractsVO";
import MyOptionContractsData from "./MyOptionContractsData";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";
import BigNumberConvert from '../../../../components/BigNumberConvert';
import ProfitChartVO from "./ProfitChartVO";
import AssetBalance from "../../../../components/AssetBalance";
import ProfitData from "./ProfitData";
import AssetApprove from "../../../../components/AssetApprove";

class OptionTradingDAO {
    loadOptionPools() {
        OptionTradingVO.reset();

        let coinName = OptionTradingVOList.coinName || OptionTradingConfig.defaultCoin;
        let optionType = OptionTradingVOList.optionType || OptionTradingConfig.defaultOptionType;

        log.debug(`loadOptionPools [coinName=${coinName},optionType=${optionType}] ...`);

        if(!OptionTradingConfig.contractConfig[coinName] || !OptionTradingConfig.contractConfig[coinName][optionType] || !OptionTradingConfig.contractConfig[coinName][optionType].address()){
            return;
        }

        let optionPoolContractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let optionPoolContractAddress = optionPoolContractConfig.address();


        OptionTradingVOList.optionPoolContractAddress = optionPoolContractAddress;
        let optionPoolContractAbi = optionPoolContractConfig.abi;
        let optionPoolContract = new window.web3.eth.Contract(optionPoolContractAbi, optionPoolContractAddress);

        optionPoolContract.methods
            .listOptions()
            .call()
            .then((result) => {
                let loadCompleteCallback=(optionTradingVoArr)=>{
                    OptionTradingVOList.setOptionRounds(optionTradingVoArr);
                    // log.debug(OptionTradingVOList);
                    OptionTradingVO.refresh();

                    OptionTradingVO.setDefaultOptionAmount();
                    this.loadOptionCosts(OptionTradingVO);
                };

                this.loadOptions(result, loadCompleteCallback);
            });
    }

    loadOptions(optionAddressArr, loadCompleteCallback) {
        let optionTradingVoArr = [];
        for (let address of optionAddressArr) {
            this.loadOption(address, optionTradingVoArr, optionAddressArr.length, loadCompleteCallback);
        }
    }

    loadOption(optionAddress, optionTradingVoArr, loadTaskLength, loadCompleteCallback) {
        let optionTradingDTO = new OptionTradingDTO();

        let coinName = OptionTradingVOList.coinName || OptionTradingConfig.defaultCoin;
        optionTradingDTO.coinName = coinName;

        let optionType = OptionTradingVOList.optionType || OptionTradingConfig.defaultOptionType;
        optionTradingDTO.optionType = optionType;

        optionTradingDTO.optionAddress=optionAddress;
        optionTradingDTO.poolContractAddress=OptionTradingVOList.optionPoolContractAddress;

        let getInfoCallback=()=>{
            if(optionTradingDTO.optionRound && optionTradingDTO.optionDuration && optionTradingDTO.strikePrice && optionTradingDTO.expiryDate && optionTradingDTO.optionAmountMax){
                log.debug(`option load success,[coinName=${coinName},optionType=${optionType}, optionAddress=${optionAddress}, optionPoolContractAddress=${OptionTradingVOList.optionPoolContractAddress}], option data => ${optionTradingDTO}`);
                optionTradingVoArr.push(optionTradingDTO);
                if(optionTradingVoArr.length==loadTaskLength){
                    loadCompleteCallback(optionTradingVoArr);
                }
            }else{
                log.debug(`loading... [optionRound=${optionTradingDTO.optionRound}, optionDuration=${optionTradingDTO.optionDuration}, strikePrice=${optionTradingDTO.strikePrice}, expiryDate=${optionTradingDTO.expiryDate}, optionAmountMax=${optionTradingDTO.optionAmountMax}]`);
            }
        };

        let contractConfig = OptionTradingConfig.contractConfig[coinName].optionContract;
        let contractAddress = optionAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .getRound()
            .call()
            .then((result) => {
                optionTradingDTO.optionRound = result;
                getInfoCallback();
            });

        contract.methods
            .getDuration()
            .call()
            .then((result) => {
                optionTradingDTO.optionDuration = result;
                getInfoCallback();
            });

        contract.methods
            .strikePrice()
            .call()
            .then((result) => {
                optionTradingDTO.strikePrice = result;
                getInfoCallback();
            });

        contract.methods
            .expiryDate()
            .call()
            .then((result) => {
                optionTradingDTO.expiryDate = result;
                getInfoCallback();
            });

        contract.methods
            .balanceOf(OptionTradingVOList.optionPoolContractAddress)
            .call()
            .then((result) => {
                optionTradingDTO.optionAmountMax = result;
                getInfoCallback();
            });
    }

    refreshStrikePrice(){
        log.debug(`refreshStrikePrice...`);

        let contractConfig = OptionTradingConfig.contractConfig[OptionTradingVO.coinName].optionContract;
        let contractAddress = OptionTradingVO.contractAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .strikePrice()
            .call()
            .then((result) => {
                log.debug(`refreshStrikePrice result => ${result}`);
                OptionTradingVO.setStrikePrice(result);
                this.loadOptionCosts(OptionTradingVO);
            });
    }

    loadOptionCosts(optionTradingVO) {
        let coinName = optionTradingVO.coinName;
        let optionType = optionTradingVO.optionType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .premiumCost(optionTradingVO.optionAmountWei,optionTradingVO.contractAddress)
            .call()
            .then((result) => {
                log.debug(`loadOptionCosts [premiumCost=${result}]`);

                optionTradingVO.setOptionCosts(result);
                optionTradingVO.refreshExpiryDate();
            });
    }

    async approve() {
        let contractConfig = OptionTradingConfig.contractConfig.USDT.hotPotToken;
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        await contract.methods
            .approve(OptionTradingVO.poolContractAddress,OptionTradingConfig.getDefaultApproveAllowance())
            .send({
                from: currentAccountStorage.account,
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                AssetApprove.getAllowance();
                this.buy();
            });
    }

    async buy() {
        log.debug(`buy coinName => ${OptionTradingVO.coinName}`);
        log.debug(`buy quantity(primitive) => ${OptionTradingVO.optionAmountWei}`);
        log.debug(`buy quantity => ${OptionTradingVO.optionAmount}`);

        let coinName = OptionTradingVO.coinName;
        let optionType = OptionTradingVO.optionType;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = OptionTradingVO.poolContractAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        await contract.methods
            .buy(OptionTradingVO.optionAmountWei,OptionTradingVO.contractAddress,OptionTradingVO.optionRound )
            .send({
                from: currentAccountStorage.account,
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                DialogBoxVO.success();
                this.loadOptionPools();
            });
    }

    loadProfits() {
        ProfitVO.reset();
        ProfitVO.addCallLoadDataLength(OptionTradingConfig.coins.length);
        ProfitVO.addPutLoadDataLength(OptionTradingConfig.coins.length);

        for (let coinConfig of OptionTradingConfig.coins) {
            let coinName = coinConfig.name;

            let callProfitData=new ProfitData();
            callProfitData.setCoinName(coinName);

            let callOptionType = 'callPoolContract';
            callProfitData.setPoolType(callOptionType);

            this.doLoadProfits(coinName, callOptionType, (profit) => {
                callProfitData.setProfit(profit);
                ProfitVO.addCallData(callProfitData);
            });


            let putProfitData=new ProfitData();
            putProfitData.setCoinName(coinName);

            let putOptionType = 'putPoolContract';
            putProfitData.setPoolType(putOptionType);

            this.doLoadProfits(coinName,putOptionType, (profit) => {
                putProfitData.setProfit(profit);
                ProfitVO.addPutData(putProfitData);
            });
        }
    }

    doLoadProfits(coinName, optionType, callback){
        log.debug(`loadProfits [coinName=${coinName},optionType=${optionType}] ...`);

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        contract.methods
            .checkProfits(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`loadProfits result [coinName=${coinName},optionType=${optionType}, profit=${result}] ...`);
                callback(result);
            });
    }

    claimProfits(coinName, optionType) {
        log.debug(`claimProfits [coinName=${coinName},optionType=${optionType}] ...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        contract.methods
            .claimProfits()
            .send({
                from: currentAccountStorage.account,
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                DialogBoxVO.success();
                AssetBalance.refresh();
                handler.loadProfits();
            });
    }

    loadMyOptionsData(){
        log.debug(`loadMyOptionsData...`);
        if(MyOptionContractsVO.isLoading){
            return;
        }

        MyOptionContractsVO.reset();

        // for (let i = 0; i < 10; i++) {
        //     let dataItem=new MyOptionContractsData();
        //     dataItem.setPoolType("callPoolContract");
        //     dataItem.setDuration("300");
        //     dataItem.setPosition("100000");
        //     dataItem.setPremium("100000");
        //     dataItem.setStrikePrice("100000");
        //     dataItem.setCurrentPrice("100000");
        //     dataItem.setRevenue("10000000");
        //     dataItem.setExpiryDate("1609669365");
        //
        //     let time=Date.now() / 1000;
        //     time=time+1;
        //     dataItem.setExpiryDate(time);
        //     MyOptionContractsVO.addData(dataItem);
        // }
        // MyOptionContractsVO.setLoading(false);

        let coinsConfig=OptionTradingConfig.coins;
        // let coinsConfig=[
        //     {
        //         name: 'BNB',
        //         icon: 'icon_bnb',
        //     },
        // ];

        for (let coinConfig of coinsConfig) {
            this.loadMyOptionsDataForAsset(coinConfig.name);
        }
    }

    loadMyOptionsDataForAsset(coinName){
        log.debug(`loadMyOptionsDataForAsset... [coinName=${coinName}]`);

        let callPoolContract=this.buildPoolContract(MyOptionContractsVO.callOptionType, coinName);
        let putPoolContract=this.buildPoolContract(MyOptionContractsVO.putOptionType, coinName);

        this.loadAssetPrice(callPoolContract,(assetPrice)=>{
            let callPoolContractAddress=OptionTradingConfig.contractConfig[coinName][MyOptionContractsVO.callOptionType];
            this.loadListOptionsForMyOptions(MyOptionContractsVO.callOptionType, callPoolContract, callPoolContractAddress.address(), coinName, assetPrice);


            let putPoolContractAddress=OptionTradingConfig.contractConfig[coinName][MyOptionContractsVO.putOptionType];
            this.loadListOptionsForMyOptions(MyOptionContractsVO.putOptionType, putPoolContract, putPoolContractAddress.address(), coinName, assetPrice);
        });
    }

    buildPoolContract(optionType, coinName){
        coinName = coinName || OptionTradingVOList.coinName;

        let contractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;
        return new window.web3.eth.Contract(contractAbi, contractAddress);
    }

    loadAssetPrice(contract,callBack){
        contract.methods
            .getAssetPrice()
            .call()
            .then((result)=>{
                callBack(result);
            });
    }

    loadListOptionsForMyOptions(optionType,contract, optionPoolContractAddress, coinName, assetPrice){
        coinName = coinName || OptionTradingVOList.coinName;

        contract.methods
            .listOptions()
            .call()
            .then((result)=>{
                log.debug(`loadListOptionsForMyOptions success, [asset=${coinName},optionType=${optionType},listOptions=${result}]`);

                MyOptionContractsVO.addLoadDataLength(result.length);

                for (let address of result) {
                    this.loadOptionInfo(optionType,address, optionPoolContractAddress, contract, coinName, assetPrice);
                }
            });
    }

    loadOptionInfo(optionType, optionAddress, optionPoolContractAddress, optionPoolContract, coinName, assetPrice){
        coinName = coinName || OptionTradingVOList.coinName;

        let optionData=new MyOptionContractsData();
        optionData.setCoinName(coinName);
        optionData.setPoolType(optionType);
        optionData.setCurrentPrice(BigNumberConvert.toShowNumber(assetPrice,"USDT"), true);

        let getInfoCallback=()=>{
            if(optionData.duration && optionData.position && optionData.premium && optionData.strikePrice && optionData.expiryDate){
                log.debug(`OptionData load success,[coinName=${coinName},optionType=${optionType}, optionAddress=${optionAddress}, optionPoolContractAddress=${optionPoolContractAddress}], option data => ${optionData}`);
                MyOptionContractsVO.addData(optionData);
            }else{
                log.debug(`loading... [duration=${optionData.duration}, position=${optionData.position}, premium=${optionData.premium}, strikePrice=${optionData.strikePrice}, expiryDate=${optionData.expiryDate}]`);
            }
        };

        let contractConfig = OptionTradingConfig.contractConfig[coinName]["optionContract"];
        let contractAddress = optionAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        contract.methods
            .balanceOf(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`Option balanceOf(${currentAccountStorage.account}) => [coinName=${coinName},optionType=${optionType}, optionAddress=${optionAddress}, optionPoolContractAddress=${optionPoolContractAddress}, balanceOf=${result}]`);

                if(result>0){
                    optionData.setPosition(result);

                    contract.methods
                        .getDuration()
                        .call()
                        .then((result) => {
                            optionData.setDuration(result);
                            getInfoCallback();
                        });

                    contract.methods
                        .getRound()
                        .call()
                        .then((round) => {
                            contract.methods
                                .getRoundAccountPaidPremiums(round,currentAccountStorage.account)
                                .call()
                                .then((premium) => {
                                    optionData.setPremium(premium);
                                    getInfoCallback();
                                });
                        });

                    contract.methods
                        .strikePrice()
                        .call()
                        .then((result) => {
                            optionData.setStrikePrice(result);
                            getInfoCallback();
                        });

                    contract.methods
                        .expiryDate()
                        .call()
                        .then((result) => {
                            optionData.setExpiryDate(result);
                            getInfoCallback();
                        });
                }else {
                    MyOptionContractsVO.addLoadedDataLength(1);
                }
            });
    }

    refreshProfitChart(){
        let contract=this.buildPoolContract(OptionTradingVOList.optionType);
        contract.methods
            .getAssetPrice()
            .call()
            .then((result)=>{
                log.debug(`refreshProfitChart->getAssetPrice => [currentPrice=${result},strikePrice=${OptionTradingVO.strikePrice},optionCosts=${OptionTradingVO.optionCosts}]`);

                // ProfitChartVO.setCurrentPrice("37110847595");
                ProfitChartVO.setCurrentPrice(result);
                ProfitChartVO.setStrikePrice(OptionTradingVO.strikePrice);
                ProfitChartVO.setOptionPremium(OptionTradingVO.optionCosts);
                if(OptionTradingVO.strikePrice > 0 && OptionTradingVO.optionCosts > 0){
                    ProfitChartVO.buildChart();
                }else{
                    ProfitChartVO.setIsLoaded(false);
                }
            });
    }
}

export default new OptionTradingDAO();
