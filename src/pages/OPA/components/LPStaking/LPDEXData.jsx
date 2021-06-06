import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";
import OPAStatsVO from "../OPAStats/OPAStatsVO";

class LPDEXData {
    @observable dexName = "";
    @observable lpStakingDataArr = [];

    @action
    setDexName(value){
        this.dexName=value;
    }

    @action
    setLpStakingDataArr(value){
        this.lpStakingDataArr=value;
    }
}

export default LPDEXData;
