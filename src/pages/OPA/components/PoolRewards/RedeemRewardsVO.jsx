import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";

class RedeemRewardsVO {
    @observable show = false;
    @observable asset = "";
    @observable assetIcon = "";
    @observable callPoolRewards = 0;
    @observable callPoolRewardsShowNumber = 0;
    @observable callPoolRewardsShow = 0;
    @observable putPoolRewards = 0;
    @observable putPoolRewardsShow = 0;
    @observable putPoolRewardsShowNumber = 0;

    @observable currentPool = 'callPoolContract';
    @observable claimEnable = false;

    @action
    setWithPoolRewardsData(poolRewardsData){
        this.setAsset(poolRewardsData.asset);
        this.setAssetIcon(poolRewardsData.assetIcon);
        this.setCallPoolRewards(poolRewardsData.callPoolRewards);
        this.setPutPoolRewards(poolRewardsData.putPoolRewards);
    }

    @action
    setShow(value){
        this.show=value;
    }

    @action
    setAsset(value){
        this.asset=value;
    }

    @action
    setAssetIcon(value){
        this.assetIcon=value;
    }

    @action
    setCallPoolRewards(value){
        this.callPoolRewards=value;
        this.callPoolRewardsShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.callPoolRewardsShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);
    }

    @action
    setPutPoolRewards(value){
        this.putPoolRewards=value;
        this.putPoolRewardsShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.putPoolRewardsShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);
    }

    @action
    setCurrentPool(value){
        this.currentPool = value;
    }

    @action
    checkClaimEnable(){
        if(this.currentPool==='callPoolContract'){
            this.claimEnable=this.callPoolRewardsShowNumber>0;
        }else{
            this.claimEnable=this.putPoolRewardsShowNumber>0;
        }
    }

    @action
    resetRewards(){
        if(this.currentPool==='callPoolContract'){
            this.setCallPoolRewards(0);
        }else{
            this.setPutPoolRewards(0);
        }

        this.checkClaimEnable();
    }
}

export default new RedeemRewardsVO();
