import log from "../../../../components/Log";
import OPAStatsVO from "./OPAStatsVO";
import ApplicationConfig from "../../../../ApplicationConfig";
import LPPriceHelper from "../../../../components/LPPriceHelper";
import moment from "moment-timezone";
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";
import BigNumberConvert from "../../../../components/BigNumberConvert";
import BigNumber from 'bignumber.js'

class OPAStatsDAO {
    loadStats(){
        log.debug(`loadStats...`);

        // this.loadCircSupply();
        this.loadCircSupplyNew();

        let tokenArr=['OPA','USDT'];
        LPPriceHelper.loadTokenPrice('',tokenArr,(opaPrice)=>{
            OPAStatsVO.setPrice(opaPrice);
            log.debug(`OPA price result => ${OPAStatsVO.priceShowNumber}`);
        });
    }

    loadCircSupply(){
        let startTime = moment(ApplicationConfig.opaMiningStartTime).tz( 'Asia/Shanghai');
        log.info(`startTime Z8 => ${startTime.format('YYYY-MM-DD HH:mm:ss')}`);

        let now=moment().tz( 'Asia/Shanghai');
        log.info(`now Z8 => ${now.format('YYYY-MM-DD HH:mm:ss')}`);

        let secondsDiff=now.diff(startTime, 'seconds');
        log.info(`now.diff(startTime, 'seconds') => ${secondsDiff}`);

        if(secondsDiff < 0){
            secondsDiff=0;
        }


        let paradrop=1666667;
        let paradropStartTime = moment(ApplicationConfig.opaParadropStartTime).tz( 'Asia/Shanghai');
        log.info(`paradropStartTime Z8 => ${paradropStartTime.format('YYYY-MM-DD HH:mm:ss')}`);
        let paradropSecondsDiff=now.diff(paradropStartTime, 'seconds');
        log.info(`now.diff(paradropStartTime, 'seconds') => ${paradropSecondsDiff}`);
        if(paradropSecondsDiff < 0){
            paradrop=0;
        }


        let circSupply=10 * secondsDiff + paradrop;
        log.info(`circSupply => ${circSupply}`);

        OPAStatsVO.setCircSupply(circSupply);
    }

    loadCircSupplyNew(){
        let uncirculationAmount=0;

        let uncirculationAccountArr=[
            '0xB27d514af8377F45c6913378E3A2FDEf40bEb8f7',
            '0x38A09Ec80aA2c5fc6E92a65E98a4e43e4dAb53b4',
            '0xA13682C85d574ce5E2571cd685277D8C9726620E',
            '0xDd6a52d5381f48EE3cba6745719eb47A47d32336',
            '0x9cc1AE3A31224920a47d4D859cDee7149dA53E49',
            '0xC510BD0204f91316b888A860D98E0ffADD559c26',
        ];

        let onLoaded = uncirculationAmount => {
            let uncirculationAmountBn = new BigNumber(uncirculationAmount);
            let uncirculationAmountNumber = uncirculationAmountBn.decimalPlaces(0).toNumber();
            let amount = 500000000 - uncirculationAmountNumber;
            OPAStatsVO.setCircSupply(amount);
        };

        let loadedCount=0;
        for(let address of uncirculationAccountArr){
            this.getOPABalance(address, balance => {
                uncirculationAmount += balance;
                loadedCount ++;
                if(loadedCount >= uncirculationAccountArr.length){
                    log.info(`loadCircSupplyNew uncirculationAmount => ${uncirculationAmount}`);
                    onLoaded(uncirculationAmount);
                }
            });
        }
    }

    getOPABalance(address, callback){
        let contractConfig = OptionTradingConfig.contractConfig['OPA']["hotPotToken"];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        contract.methods
            .balanceOf(address)
            .call()
            .then(result => {
                let amount=BigNumberConvert.toShowNumberDecimalOPA(result);
                log.info(`balanceOf ${address} => ${result} <=> ${amount}`);
                callback(amount);
            });
    }
}

export default new OPAStatsDAO();
