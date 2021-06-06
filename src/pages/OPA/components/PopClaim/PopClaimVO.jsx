import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";

class PopClaimVO {
    @observable show = false;
    @observable title = "REDEEM REWARDS";
    @observable rewardsFrom = "";
    @observable rewards = 0;
    @observable rewardsShow = 0;

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
    setTitle(value) {
        this.title = value;
    }

    @action
    setRewardsFrom(value) {
        this.rewardsFrom = value;
    }

    @action
    setRewards(value) {
        this.rewards = value;
        this.rewardsShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.submitEnable=this.rewards>0;
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

export default new PopClaimVO();
