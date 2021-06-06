import log from "../../../../components/Log";
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";
import AssetBalance from "../../../../components/AssetBalance";
import LPPriceHelper from "../../../../components/LPPriceHelper";
import PopStakeVO from "../PopStake/PopStakeVO";
import AssetApprove from "../../../../components/AssetApprove";
import BigNumber from "bignumber.js";
import BigNumberConvert from "../../../../components/BigNumberConvert";
import PopClaimVO from "../PopClaim/PopClaimVO";
import PopWithdrawVO from "../PopWithdraw/PopWithdrawVO";
import ApplicationConfig from "../../../../ApplicationConfig";
import LPDEXData from "./LPDEXData";
import LPStakingData from "./LPStakingData";
import LPStakingVO from "./LPStakingVO";

class LPStakingDAO {
    /**
     * just load staking item，don't read data from the contract
     */
    loadLPStakingItem(){
        log.debug(`loadLPStakingData...`);

        let stakingDataArr=[];

        for(let dex of ApplicationConfig.LPStakingConfig){
            let lpDEXData=new LPDEXData();
            lpDEXData.setDexName(dex.dexName);

            let lpStakingDataArr=[];
            for(let tokenPair of dex.tokenPair){
                let lpStakingData=new LPStakingData();

                lpStakingData.setDexName(dex.dexName);
                lpStakingData.setTokenPairName(tokenPair.name);
                lpStakingData.setTokenArr(tokenPair.token);
                lpStakingData.setAssetName(tokenPair.assetName);
                lpStakingData.setProvideLiquidityUrl(tokenPair.plUrl);

                lpStakingDataArr.push(lpStakingData);
            }
            lpDEXData.setLpStakingDataArr(lpStakingDataArr);

            stakingDataArr.push(lpDEXData);
        }

        LPStakingVO.setLpDEXDataArr(stakingDataArr);
    }

    /**
     * read data from the contract after wallet is connected
     */
    loadLPStakingData(){
        log.debug(`loadLPStakingData...`);

        let handler=this;

        for(let dex of LPStakingVO.lpDEXDataArr){
            for(let lpStakingData of dex.lpStakingDataArr){
                handler.loadLPTotalStaked(lpStakingData);
                handler.loadMyLPStaked(lpStakingData);
                handler.loadMyLPRewards(lpStakingData);
            }
        }
    }

    loadLPTotalStaked(lpStakingData){
        log.debug(`loadLPTotalStaked ...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(lpStakingData.getPairId());
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .totalStaked()
            .call()
            .then((result) => {
                log.debug(`loadLPTotalStaked => [result=${result}]`);

                lpStakingData.setTotalStaked(result);
                handler.loadMyLPAPR(lpStakingData);
            });
    }

    loadMyLPStaked(lpStakingData){
        log.debug(`loadMyLPStaked ...`);

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(lpStakingData.getPairId());
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .numStaked(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`loadMyLPStaked => [result=${result}]`);

                lpStakingData.setMyStaked(result);
            });
    }

    loadMyLPRewards(lpStakingData){
        log.debug(`loadMyLPRewards ...`);

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(lpStakingData.getPairId());
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .checkReward(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`loadMyLPRewards => [result=${result}]`);

                lpStakingData.setMyRewards(result);
            });
    }

    loadMyLPAPR(lpStakingData){
        log.debug(`loadMyLPAPR ...`);

        if(lpStakingData.totalStakedShowNumber){
            // let tokenArr=['ADA','BNB'];
            let tokenArr=['OPA','USDT'];
            LPPriceHelper.loadTokenPrice(lpStakingData.dexName,tokenArr,(opaPrice)=>{
                lpStakingData.setOpaPrice(opaPrice);
                log.debug(`OPA price result => ${lpStakingData.opaPriceShowNumber}`);

                LPPriceHelper.loadLPTokenPrice(lpStakingData.dexName, tokenArr, lpTokenPrice => {
                    lpStakingData.setOpaLPTokenPrice(lpTokenPrice);
                    log.debug(`OPA LP token price result => ${lpStakingData.opaLPTokenPriceShowNumber}`);

                    lpStakingData.setTotalStakedValue();

                    let myStakedShowNumber=1;
                    this.loadLPOPABlockReward(lpStakingData, opaBlockReward => {
                        let opaRewardsDay = new BigNumber(myStakedShowNumber).times(opaBlockReward).div(lpStakingData.totalStakedShowNumber);
                        log.info(`loadMyLPAPR [myStakedShowNumber=${myStakedShowNumber}, totalStakedShowNumber=${lpStakingData.totalStakedShowNumber}, opaOutputDay=${opaBlockReward}, opaRewardsDay=${opaRewardsDay}]`);

                        let opaValueDay=new BigNumber(lpStakingData.opaPriceShowNumber).times(opaRewardsDay);
                        let lpTokenValue=new BigNumber(myStakedShowNumber).times(lpStakingData.opaLPTokenPriceShowNumber);
                        let apr=opaValueDay.times(365).times(100).div(lpTokenValue);
                        apr=BigNumberConvert.toFormatDecimal(apr,2);

                        log.info(`loadMyLPAPR result => ${apr}`);

                        lpStakingData.setMyApr(apr);
                    });
                });
            });
        }
    }

    loadLPOPABlockReward(lpStakingData, callback){
        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(lpStakingData.getPairId());
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods['OPABlockReward']
            .call(contract.methods)
            .call()
            .then((result) => {
                log.info(`loadLPOPABlockReward => [result=${result}]`);

                let opaBlockReward=BigNumberConvert.toShowNumberDecimalOPA(result);
                opaBlockReward=opaBlockReward * 20 * 60 * 24;
                callback(opaBlockReward);
            });
    }

    lpStake(){
        log.debug(`lpStake...`);

        let handler=this;
        DialogBoxVO.confirm();

        let contractConfig=OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(PopStakeVO.assetDes);

        let allowance=AssetApprove.getContractAllowance(contractAddress);
        let allowanceNb=new BigNumber(allowance);
        let defaultApproveThresholdNb=new BigNumber(OptionTradingConfig.getDefaultApproveThreshold());
        log.debug(`allowanceNb => ${allowanceNb.toFormat()}`);
        log.debug(`defaultApproveThresholdNb => ${defaultApproveThresholdNb.toFormat()}`);

        let isNeedApprove=allowanceNb.lt(defaultApproveThresholdNb);
        log.debug(`isNeedApprove => ${isNeedApprove}`);
        if(isNeedApprove){
            AssetApprove.approve(contractAddress, ()=>{
                handler.doLPStake();
            },'OPA');
        }else{
            handler.doLPStake();
        }
    }

    doLPStake(){
        log.debug(`doLPStake [amount=${PopStakeVO.stakeAmount} <=> ${PopStakeVO.stakeAmountBN}]...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(PopStakeVO.assetDes);
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .stake(PopStakeVO.stakeAmountBN)
            .send({
                from: currentAccountStorage.account
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                DialogBoxVO.success();
                PopStakeVO.setPopEventTimestamp(0);

                AssetBalance.refresh();
                AssetApprove.refresh("OPA");

                let maxStakeNew=PopStakeVO.maxStake-PopStakeVO.stakeAmountBN;
                PopStakeVO.setMaxStake(maxStakeNew);

                handler.loadLPStakingData();
            });
    }

    lpClaim(){
        log.debug(`lpClaim...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(PopClaimVO.rewardsFrom);
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .claimRewards()
            .send({
                from: currentAccountStorage.account
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                DialogBoxVO.success();
                PopClaimVO.setPopEventTimestamp(0);
                PopClaimVO.setRewards(0);

                handler.loadLPStakingData();
                AssetBalance.refresh();
            });
    }

    lpWithdraw(){
        log.debug(`lpWithdraw [amount=${PopWithdrawVO.withdrawAmount} <=> ${PopWithdrawVO.withdrawAmountBN}]...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address(PopWithdrawVO.assetDes);
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .withdraw(PopWithdrawVO.withdrawAmountBN)
            .send({
                from: currentAccountStorage.account
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                DialogBoxVO.success();
                PopWithdrawVO.setPopEventTimestamp(0);

                AssetBalance.refresh();

                let maxWithdrawNew=PopWithdrawVO.maxWithdraw-PopWithdrawVO.withdrawAmountBN;
                PopWithdrawVO.setMaxWithdraw(maxWithdrawNew);

                handler.loadLPStakingData();
            });
    }
}

export default new LPStakingDAO();
