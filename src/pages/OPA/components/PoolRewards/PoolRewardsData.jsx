import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";

class PoolRewardsData {
    @observable asset = "";
    @observable assetIcon = "";
    @observable callPoolRewards = 0;
    @observable callPoolRewardsShow = 0;
    @observable callPoolRewardsShowNumber = 0;
    @observable putPoolRewards = 0;
    @observable putPoolRewardsShow = 0;
    @observable putPoolRewardsShowNumber = 0;

    @action
    setAsset(asset){
        this.asset=asset;
    }

    @action
    setAssetIcon(assetIcon){
        this.assetIcon=assetIcon;
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
}

export default PoolRewardsData;
