import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";

class PopWithdrawVO {
    @observable show = false;
    @observable title = "";
    @observable withdrawAmountBN = 0;
    @observable assetDes = "";
    @observable assetUnit = "";
    @observable stakeAsset = "";
    @observable maxWithdraw = 0;
    @observable maxWithdrawShow = 0;
    @observable maxWithdrawShowNumber = 0;
    @observable withdrawAmount = 0;
    @observable withdrawAmountBN = 0;

    // 'DAO' or 'LP'
    @observable popEventSource = '';
    @observable popEventTimestamp = '';

    @observable submitEnable = false;

    @action
    setShow(show){
        this.show=show;
    }

    @action
    setTitle(value) {
        this.title = value;
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
    setMaxWithdraw(value) {
        this.maxWithdraw = value;
        this.maxWithdrawShow=BigNumberConvert.toShowValueFormatDecimalSmall(value,this.stakeAsset, 4);
        this.maxWithdrawShowNumber=BigNumberConvert.toShowNumberDecimalAssetSmall(value,this.stakeAsset, 4);

        if(this.maxWithdrawShowNumber < 1){
            this.setWithdrawAmount(this.maxWithdrawShowNumber);
        }else{
            this.setWithdrawAmount(1);
        }

        this.submitEnable=this.maxWithdrawShowNumber>0;
    }

    @action
    setWithdrawAmount(value) {
        this.withdrawAmount = value;
        this.withdrawAmountBN = BigNumberConvert.toPrimitiveValue(value, this.stakeAsset);

        this.submitEnable=this.maxWithdrawShowNumber>0 && value>0;
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

export default new PopWithdrawVO();
