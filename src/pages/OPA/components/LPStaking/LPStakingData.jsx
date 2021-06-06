import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";
import OPAStatsVO from "../OPAStats/OPAStatsVO";

class LPStakingData {
    @observable dexName = "";
    @observable tokenPairName = "";
    @observable tokenArr = [];
    @observable assetName = "";
    @observable provideLiquidityUrl = "";

    @observable totalStaked = 0;
    @observable totalStakedShow = 0;
    @observable totalStakedShowNumber = 0;

    @observable totalStakedValue = 0;

    @observable myStaked = 0;
    @observable myStakedShow = 0;
    @observable myStakedShowNumber = 0;

    @observable myRewards = 0;
    @observable myRewardsShow = 0;

    @observable opaPrice = 0;
    @observable opaPriceShowNumber = 0;
    @observable opaLPTokenPrice = 0;
    @observable opaLPTokenPriceShowNumber = 0;
    @observable myApr = 0;

    @action
    setDexName(value){
        this.dexName=value;
    }

    @action
    setTokenPairName(value){
        this.tokenPairName=value;
    }

    @action
    setTokenArr(value){
        this.tokenArr=value;
    }

    @action
    setAssetName(value){
        this.assetName=value;
    }

    @action
    setProvideLiquidityUrl(value){
        this.provideLiquidityUrl=value;
    }

    @action
    setTotalStaked(value){
        this.totalStaked=value;
        this.totalStakedShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.totalStakedShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);
    }

    @action
    setTotalStakedValue(){
        let value = this.totalStakedShowNumber * this.opaLPTokenPriceShowNumber;
        if(value < 0.01){
            this.totalStakedValue=BigNumberConvert.toFormatDecimal(value, 4);
        }else{
            this.totalStakedValue=BigNumberConvert.toFormatDecimal(value, 2);
        }
    }

    @action
    setMyStaked(value){
        this.myStaked=value;
        this.myStakedShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.myStakedShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);
    }

    @action
    setMyRewards(value){
        this.myRewards=value;
        this.myRewardsShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
    }

    @action
    setOpaPrice(value){
        this.opaPrice=value;
        this.opaPriceShowNumber=BigNumberConvert.toShowNumberDecimalUSDT(value);
    }

    @action
    setOpaLPTokenPrice(value){
        this.opaLPTokenPrice=value;
        this.opaLPTokenPriceShowNumber=BigNumberConvert.toShowNumberDecimalUSDT(value);
    }

    @action
    setMyApr(value){
        this.myApr=value;
    }

    getPairId(){
        return `${this.tokenPairName}@${this.dexName}`;
    }
}

export default LPStakingData;
