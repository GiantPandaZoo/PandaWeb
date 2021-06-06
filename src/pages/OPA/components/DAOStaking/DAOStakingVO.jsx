import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";
import OPAStatsVO from "../OPAStats/OPAStatsVO";

class DAOStakingVO {
    @observable totalStaked = 0;
    @observable totalStakedShow = 0;
    @observable totalStakedShowNumber = 0;

    @observable totalStakedValue = 0;

    @observable myDaoStaked = 0;
    @observable myDaoStakedShow = 0;
    @observable myDaoStakedShowNumber = 0;

    @observable myDaoRewards = 0;
    @observable myDaoRewardsShow = 0;

    @observable myDaoApr = 0;

    @action
    setTotalStaked(value){
        this.totalStaked=value;
        this.totalStakedShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.totalStakedShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);
    }

    @action
    setTotalStakedValue(){
        let value = this.totalStakedShowNumber * OPAStatsVO.price;
        this.totalStakedValue=BigNumberConvert.toShowValueFormatDecimalUSDT(value);
    }

    @action
    setMyDaoStaked(value){
        this.myDaoStaked=value;
        this.myDaoStakedShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.myDaoStakedShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);
    }

    @action
    setMyDaoRewards(value){
        this.myDaoRewards=value;
        this.myDaoRewardsShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
    }

    @action
    setMyDaoApr(value){
        this.myDaoApr=value;
    }
}

export default new DAOStakingVO();
