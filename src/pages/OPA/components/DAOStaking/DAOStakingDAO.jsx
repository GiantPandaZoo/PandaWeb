import log from "../../../../components/Log";
import DAOStakingVO from "./DAOStakingVO";
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";
import AssetBalance from "../../../../components/AssetBalance";
import PopStakeVO from "../PopStake/PopStakeVO";
import AssetApprove from "../../../../components/AssetApprove";
import BigNumber from "bignumber.js";
import PopClaimVO from "../PopClaim/PopClaimVO";
import PopWithdrawVO from "../PopWithdraw/PopWithdrawVO";
import ApplicationConfig from "../../../../ApplicationConfig";
import BigNumberConvert from "../../../../components/BigNumberConvert";

class DAOStakingDAO {
    loadDAOStakingData(){
        log.debug(`loadDAOStakingData...`);

        this.loadDAOTotalStaked();
        this.loadMyDAOStaked();
        this.loadMyDAORewards();
    }

    loadDAOTotalStaked(){
        log.debug(`loadDAOTotalStaked ...`);

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .totalStaked()
            .call()
            .then((result) => {
                log.debug(`loadDAOTotalStaked => [result=${result}]`);

                DAOStakingVO.setTotalStaked(result);
            });
    }

    loadMyDAOStaked(){
        log.debug(`loadMyDAOStaked ...`);

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .numStaked(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`loadMyDAOStaked => [result=${result}]`);

                DAOStakingVO.setMyDaoStaked(result);
            });
    }

    loadMyDAOAPR(){
        let myDaoStakedShowNumber=1;
        if(DAOStakingVO.totalStakedShowNumber){
            this.loadOPABlockReward(opaBlockReward => {
                let opaRewardsDay = new BigNumber(myDaoStakedShowNumber).times(opaBlockReward).div(DAOStakingVO.totalStakedShowNumber);
                log.info(`loadMyDAOAPR [myDaoStakedShowNumber=${myDaoStakedShowNumber}, totalStakedShowNumber=${DAOStakingVO.totalStakedShowNumber}, opaOutputDay=${opaBlockReward}, opaRewardsDay=${opaRewardsDay}]`);

                let apr=new BigNumber(opaRewardsDay).times(365).times(100).div(myDaoStakedShowNumber);
                apr=BigNumberConvert.toFormatDecimal(apr,2);

                log.info(`loadMyDAOAPR result => ${apr}`);

                DAOStakingVO.setMyDaoApr(apr);
            });
        }
    }

    loadOPABlockReward(callback){
        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods['OPABlockReward']
            .call(contract.methods)
            .call()
            .then((result) => {
                log.info(`loadOPABlockReward => [result=${result}]`);

                let opaBlockReward=BigNumberConvert.toShowNumberDecimalOPA(result);
                opaBlockReward=opaBlockReward * 20 * 60 * 24;
                callback(opaBlockReward);
            });
    }

    loadMyDAORewards(){
        log.debug(`loadMyDAORewards ...`);

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .checkReward(currentAccountStorage.account)
            .call()
            .then((result) => {
                log.debug(`loadMyDAORewards => [result=${result}]`);

                DAOStakingVO.setMyDaoRewards(result);
            });
    }

    daoStake(){
        log.debug(`daoStake...`);

        let handler=this;
        DialogBoxVO.confirm();

        let contractConfig=OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');

        let allowance=AssetApprove.getContractAllowance(contractAddress);
        let allowanceNb=new BigNumber(allowance);
        let defaultApproveThresholdNb=new BigNumber(OptionTradingConfig.getDefaultApproveThreshold());
        log.debug(`allowanceNb => ${allowanceNb.toFormat()}`);
        log.debug(`defaultApproveThresholdNb => ${defaultApproveThresholdNb.toFormat()}`);

        let isNeedApprove=allowanceNb.lt(defaultApproveThresholdNb);
        log.debug(`isNeedApprove => ${isNeedApprove}`);
        if(isNeedApprove){
            AssetApprove.approve(contractAddress, ()=>{
                handler.doDAOStake();
            },'OPA');
        }else{
            handler.doDAOStake();
        }
    }

    doDAOStake(){
        log.debug(`doDAOStake [amount=${PopStakeVO.stakeAmount} <=> ${PopStakeVO.stakeAmountBN}]...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
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

                handler.loadDAOStakingData();
            });
    }

    daoClaim(){
        log.debug(`daoClaim...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
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

                handler.loadDAOStakingData();
                AssetBalance.refresh();
            });
    }

    daoWithdraw(){
        log.debug(`daoWithdraw [amount=${PopWithdrawVO.withdrawAmount} <=> ${PopWithdrawVO.withdrawAmountBN}]...`);

        let handler=this;

        let contractConfig = OptionTradingConfig.contractConfig['OPA']['staking'];
        let contractAddress = contractConfig.address('DAO');
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

                handler.loadDAOStakingData();
            });
    }
}

export default new DAOStakingDAO();
