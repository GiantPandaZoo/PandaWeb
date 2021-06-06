import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import log from "../../../../components/Log";
import AnalyticsVO from "./AnalyticsVO";
import UnderlyingAssetVO from "./UnderlyingAssetVO";
import UnderwritingPoolVO from "./UnderwritingPoolVO";
import UnderwritingPoolSnapshotVO from "./UnderwritingPoolSnapshotVO";
import UnderwritingPoolSnapshotData from "./UnderwritingPoolSnapshotData";

class AnalyticsDAO {
    loadUnderlyingAsset(){
        log.debug(`loadUnderlyingAsset...`);
        UnderlyingAssetVO.reset();
        this.loadPositionAndIncome();
    }

    loadPositionAndIncome(){
        log.debug(`loadPosition... [AnalyticsVO.coinName=${AnalyticsVO.coinName}]`);

        let callPoolContract=this.buildPoolContract(AnalyticsVO.callOptionType);
        let putPoolContract=this.buildPoolContract(AnalyticsVO.putOptionType);
        this.loadAssetPrice(callPoolContract,()=>{
            let callPoolContractAddress=OptionTradingConfig.contractConfig[AnalyticsVO.coinName][AnalyticsVO.callOptionType].address();
            this.loadListOptions(AnalyticsVO.callOptionType,callPoolContract,callPoolContractAddress,(quantity)=>{
                UnderlyingAssetVO.addCallAssetQuantity(quantity);
            },(quantity)=>{
                UnderlyingAssetVO.addCallIncomeQuantity(quantity);
            });

            let putPoolContractAddress=OptionTradingConfig.contractConfig[AnalyticsVO.coinName][AnalyticsVO.putOptionType].address();
            this.loadListOptions(AnalyticsVO.putOptionType,putPoolContract,putPoolContractAddress,(quantity)=>{
                UnderlyingAssetVO.addPutAssetQuantity(quantity);
            },(quantity)=>{
                UnderlyingAssetVO.addPutIncomeQuantity(quantity);
            });
        });
    }

    buildPoolContract(optionType){
        let coinName = AnalyticsVO.coinName;

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
                UnderlyingAssetVO.setCurrentPrice(result);
                callBack();
            });
    }

    loadListOptions(optionType,contract, optionPoolContractAddress, loadOptionTotalSupplyCallBack, loadOptionTotalIncomeCallBack){
        contract.methods
            .listOptions()
            .call()
            .then((result)=>{
                log.debug(`loadListOptions success, [asset=${AnalyticsVO.coinName},optionType=${optionType},listOptions=${result}]`);

                for (let address of result) {
                    this.loadOptionTotalSupplyAndIncome(optionType,address, optionPoolContractAddress, loadOptionTotalSupplyCallBack, loadOptionTotalIncomeCallBack)
                }
            });
    }

    loadOptionTotalSupplyAndIncome(optionType, optionAddress, optionPoolContractAddress, addAssetTotalSupplyCallBack, loadOptionTotalIncomeCallBack){
        let coinName = AnalyticsVO.coinName;

        let contractConfig = OptionTradingConfig.contractConfig[coinName]["optionContract"];
        let contractAddress = optionAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .totalSupply()
            .call()
            .then((totalSupply) => {
                contract.methods
                    .balanceOf(optionPoolContractAddress)
                    .call()
                    .then((balanceOf) => {
                        log.debug(`loadOptionTotalSupplyAndBalanceOf success, [asset=${AnalyticsVO.coinName},optionType=${optionType},optionAddress=${optionAddress},totalSupply=${totalSupply},balanceOf=${balanceOf}]`);
                        let openPosition=totalSupply-balanceOf;
                        addAssetTotalSupplyCallBack(openPosition);
                    });
            });

        contract.methods
            .totalPremiums()
            .call()
            .then((result) => {
                log.debug(`loadOptionTotalPremiums  success, [asset=${AnalyticsVO.coinName},optionType=${optionType},optionAddress=${optionAddress},totalPremiums=${result}]`);
                loadOptionTotalIncomeCallBack(result);
            });
    }

    loadUnderlyingPool(){
        log.debug(`loadUnderlyingPool...`);
        UnderwritingPoolVO.reset();

        let callPoolContract=this.buildPoolContract(AnalyticsVO.callOptionType);
        this.loadUtilizationRatio(AnalyticsVO.callOptionType,callPoolContract,(utilizationRatio)=>{
            UnderwritingPoolVO.setCallUtilizationRatio(utilizationRatio);
        });
        this.loadTotalAsset(AnalyticsVO.callOptionType,callPoolContract,(totalAsset)=>{
            UnderwritingPoolVO.setCallTotalAsset(totalAsset);
        });

        let putPoolContract=this.buildPoolContract(AnalyticsVO.putOptionType);
        this.loadUtilizationRatio(AnalyticsVO.putOptionType,putPoolContract,(utilizationRatio)=>{
            UnderwritingPoolVO.setPutUtilizationRatio(utilizationRatio);
        });
        this.loadTotalAsset(AnalyticsVO.putOptionType,putPoolContract,(totalAsset)=>{
            UnderwritingPoolVO.setPutTotalAsset(totalAsset);
        });
    }

    loadUtilizationRatio(optionType,contract,callBack){
        contract.methods
            .currentUtilizationRate()
            .call()
            .then((result)=>{
                log.debug(`loadUtilizationRatio success, [asset=${AnalyticsVO.coinName},optionType=${optionType},utilizationRatio=${result}]`);
                callBack(result);
            });
    }

    loadTotalAsset(optionType,contract,callBack){
        contract.methods
            .collateral()
            .call()
            .then((result)=>{
                log.debug(`loadTotalAsset success, [asset=${AnalyticsVO.coinName},optionType=${optionType},collateral=${result}]`);
                callBack(result);
            });
    }

    loadUnderwritingPoolSnapshotData(){
        log.debug(`loadUnderwritingPoolSnapshotData... [AnalyticsVO.coinName=${AnalyticsVO.coinName}]`);
        if(UnderwritingPoolSnapshotVO.isLoading){
            return;
        }

        UnderwritingPoolSnapshotVO.reset();

        // for (let i = 0; i < 2; i++) {
        //     let poolDataItem=new UnderwritingPoolSnapshotData();
        //     poolDataItem.setPoolType("CALL");
        //     poolDataItem.setDuration("300");
        //     poolDataItem.setPosition("10");
        //     poolDataItem.setAvailable("10");
        //     poolDataItem.setStrikePrice("100");
        //     poolDataItem.setCurrentPrice("100");
        //     poolDataItem.setRevenue("0");
        //     poolDataItem.setExpiryDate("1609669365");
        //
        //     let time=Date.now() / 1000;
        //     time=time+1;
        //     poolDataItem.setExpiryDate(time);
        //     UnderwritingPoolSnapshotVO.addPoolData(poolDataItem);
        // }

        let callPoolContract=this.buildPoolContract(AnalyticsVO.callOptionType);
        let callPoolContractAddress=OptionTradingConfig.contractConfig[AnalyticsVO.coinName][AnalyticsVO.callOptionType];
        this.loadListOptionsForPoolSnapshot(AnalyticsVO.callOptionType, callPoolContract, callPoolContractAddress.address());

        let putPoolContract=this.buildPoolContract(AnalyticsVO.putOptionType);
        let putPoolContractAddress=OptionTradingConfig.contractConfig[AnalyticsVO.coinName][AnalyticsVO.putOptionType];
        this.loadListOptionsForPoolSnapshot(AnalyticsVO.putOptionType, putPoolContract, putPoolContractAddress.address());
    }

    loadListOptionsForPoolSnapshot(optionType,contract, optionPoolContractAddress){
        contract.methods
            .listOptions()
            .call()
            .then((result)=>{
                log.debug(`loadListOptionsForPoolSnapshot success, [asset=${AnalyticsVO.coinName},optionType=${optionType},listOptions=${result}]`);

                UnderwritingPoolSnapshotVO.addLoadDataLength(result.length);

                for (let address of result) {
                    this.loadOptionInfo(optionType,address, optionPoolContractAddress);
                }
            });
    }

    loadOptionInfo(optionType, optionAddress, optionPoolContractAddress, optionsLength){
        let poolDada=new UnderwritingPoolSnapshotData();

        poolDada.setPoolType(optionType);
        poolDada.setCurrentPrice(UnderlyingAssetVO.currentPrice, true);

        let getInfoCallback=()=>{
            if(poolDada.duration && poolDada.totalSupply && poolDada.available && poolDada.strikePrice && poolDada.revenue && poolDada.expiryDate){
                log.debug(`PoolData load success,[coinName=${coinName},optionType=${optionType}, optionAddress=${optionAddress}, optionPoolContractAddress=${optionPoolContractAddress}], option data => ${poolDada}`);
                UnderwritingPoolSnapshotVO.addPoolData(poolDada);
            }
        };

        let coinName = AnalyticsVO.coinName;

        let contractConfig = OptionTradingConfig.contractConfig[coinName]["optionContract"];
        let contractAddress = optionAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        contract.methods
            .getDuration()
            .call()
            .then((result) => {
                poolDada.setDuration(result);
                getInfoCallback();
            });

        contract.methods
            .totalSupply()
            .call()
            .then((result) => {
                poolDada.setTotalSupply(result);
                getInfoCallback();
            });

        contract.methods
            .balanceOf(optionPoolContractAddress)
            .call()
            .then((result) => {
                poolDada.setAvailable(result);
                getInfoCallback();
            });

        contract.methods
            .strikePrice()
            .call()
            .then((result) => {
                poolDada.setStrikePrice(result);
                getInfoCallback();
            });

        contract.methods
            .totalPremiums()
            .call()
            .then((result) => {
                poolDada.setRevenue(result);
                getInfoCallback();
            });

        contract.methods
            .expiryDate()
            .call()
            .then((result) => {
                poolDada.setExpiryDate(result);
                getInfoCallback();
            });
    }
}

export default new AnalyticsDAO();
