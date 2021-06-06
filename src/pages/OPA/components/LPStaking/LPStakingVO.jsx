import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";
import OPAStatsVO from "../OPAStats/OPAStatsVO";

class LPStakingVO {
    @observable lpDEXDataArr = [];

    @action
    setLpDEXDataArr(value){
        this.lpDEXDataArr=value;
    }
}

export default new LPStakingVO();
