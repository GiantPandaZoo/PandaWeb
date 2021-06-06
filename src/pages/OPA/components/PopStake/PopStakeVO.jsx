import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";

class PopStakeVO {
    @observable show = false;
    @observable title = "";
    @observable asset = "";
    @observable assetDes = "";
    @observable assetUnit = "";
    @observable stakeAsset = "";
    @observable maxStake = 0;
    @observable maxStakeShow = 0;
    @observable maxStakeShowNumber = 0;
    @observable stakeAmount = 0;
    @observable stakeAmountBN = 0;

    @observable providerLiquidityUrl = '';

    // 'DAO' or 'LP'
    @observable popEventSource = '';
    @observable popEventTimestamp = '';

    @observable submitEnable = false;

    @action
    setTitle(value) {
        this.title = value;
    }

    @action
    setShow(value) {
        this.show = value;
    }

    @action
    setAsset(value) {
        this.asset = value;
    }

    @action
    setAssetDes(value) {
        this.assetDes = value;
    }

    @action
    setAssetUnit(value) {
        this.assetUnit = value;
    }

    @action
    setStakeAsset(value) {
        this.stakeAsset = value;
    }

    @action
    setMaxStake(value) {
        this.maxStake = value;
        this.maxStakeShow=BigNumberConvert.toShowValueFormatDecimalSmall(value,this.stakeAsset, 4);
        this.maxStakeShowNumber=BigNumberConvert.toShowNumberDecimalAssetSmall(value,this.stakeAsset, 4);
        if(this.maxStakeShowNumber < 1){
            this.setStakeAmount(this.maxStakeShowNumber);
        }else{
            this.setStakeAmount(1);
        }
    }

    @action
    setStakeAmount(value) {
        this.stakeAmount = value;
        this.stakeAmountBN = BigNumberConvert.toPrimitiveValue(value, this.stakeAsset);

        this.submitEnable=this.maxStakeShowNumber>0 && value>0;
    }

    @action
    setProviderLiquidityUrl(value) {
        this.providerLiquidityUrl = value;
    }

    @action
    setPopEventSource(value) {
        this.popEventSource = value;
        this.setPopEventTimestamp(0);
    }

    @action
    setPopEventTimestamp(value) {
        this.popEventTimestamp = value;
    }

    @action
    triggerSubmitEvent() {
        this.setPopEventTimestamp((new Date()).getTime());
    }
}

export default new PopStakeVO();
