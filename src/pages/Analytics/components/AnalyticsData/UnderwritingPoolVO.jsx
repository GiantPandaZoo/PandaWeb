import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert';
import log from "../../../../components/Log";
import AnalyticsVO from "./AnalyticsVO";
import UnderlyingAssetVO from "./UnderlyingAssetVO";

class UnderwritingPoolVO {
    @observable callUtilizationRatio = 0;
    @observable callUtilizationRatioShow = 0;
    @observable callAvailableAssetQuantity = 0;
    @observable callAvailableAssetQuantityShow = 0;
    @observable callTotalAsset = 0;
    @observable callTotalAssetShowNumber = 0;
    @observable callTotalAssetShow = 0;

    @observable putUtilizationRatio = 0;
    @observable putUtilizationRatioShow = 0;
    @observable putAvailableAssetQuantity = 0;
    @observable putAvailableAssetQuantityShow = 0;
    @observable putTotalAsset = 0;
    @observable putTotalAssetShowNumber = 0;
    @observable putTotalAssetShow = 0;
    @observable putTotalAssetValueShow = 0;

    constructor(){
    }

    @action
    reset(){
        this.callUtilizationRatio = 0;
        this.callUtilizationRatioShow = 0;
        this.callAvailableAssetQuantityShow = 0;
        this.callAvailableAssetQuantity=0;
        this.callTotalAsset=0;
        this.callTotalAssetShowNumber=0;
        this.callTotalAssetShow=0;

        this.putUtilizationRatio = 0;
        this.putUtilizationRatioShow = 0;
        this.putAvailableAssetQuantityShow = 0;
        this.putAvailableAssetQuantity=0;
        this.putTotalAsset=0;
        this.putTotalAssetShowNumber=0;
        this.putTotalAssetShow=0;
        this.putTotalAssetValueShow = 0;
    }

    @action
    setCallUtilizationRatio(callUtilizationRatio){
        this.callUtilizationRatio=callUtilizationRatio;
        this.callUtilizationRatioShow=callUtilizationRatio/100;
    }

    @action
    setCallAvailableAssetQuantityShow(){
        let callAvailableAssetQuantity=this.callTotalAssetShowNumber*0.75 - UnderlyingAssetVO.callAssetQuantityShowNumber;
        if(callAvailableAssetQuantity < 0.01){
            this.callAvailableAssetQuantity=BigNumberConvert.toFormatDecimalNumber(callAvailableAssetQuantity,4);
        }else{
            this.callAvailableAssetQuantity=BigNumberConvert.toFormatDecimalNumber(callAvailableAssetQuantity,2);
        }
        this.callAvailableAssetQuantityShow=BigNumberConvert.toFormatDecimal(callAvailableAssetQuantity,4);
    }

    @action
    setCallTotalAsset(callTotalAsset){
        this.callTotalAsset=callTotalAsset;
        this.callTotalAssetShowNumber=BigNumberConvert.toShowValue(callTotalAsset,AnalyticsVO.coinName,4);
        this.callTotalAssetShow=BigNumberConvert.toShowValueFormatDecimal(callTotalAsset,AnalyticsVO.coinName,4);
    }

    getCallUtilizationRatioStyle(){
        return  {
            width:`${this.callUtilizationRatio}%`
        };
    }

    getCallAvailableAssetQuantityStyle(){
        let ratio=this.callAvailableAssetQuantity/this.callTotalAssetShowNumber;
        ratio=BigNumberConvert.toFormatDecimalNumber(ratio*100,2);
        log.debug(`[callAvailableAssetQuantity=${this.callAvailableAssetQuantity},callTotalAssetShowNumber=${this.callTotalAssetShowNumber},ratio=${ratio}]`);
        return  {
            width:`${ratio}%`
        };
    }

    @action
    setPutUtilizationRatio(putUtilizationRatio){
        this.putUtilizationRatio=putUtilizationRatio;
        this.putUtilizationRatioShow=putUtilizationRatio/100;
    }

    @action
    setPutAvailableAssetQuantityShow(){
        let putAvailableAssetQuantity=this.putTotalAssetShowNumber*0.75 - UnderlyingAssetVO.putAssetQuantityShowNumber;
        this.putAvailableAssetQuantity=BigNumberConvert.toFormatDecimalNumber(putAvailableAssetQuantity,2);
        this.putAvailableAssetQuantityShow=BigNumberConvert.toFormatDecimal(putAvailableAssetQuantity,4);
    }

    @action
    setPutTotalAsset(putTotalAsset){
        let putTotalAssetShowNumber=BigNumberConvert.toShowValue(putTotalAsset,"USDT");
        this.putTotalAsset=putTotalAssetShowNumber/UnderlyingAssetVO.currentPrice;
        this.putTotalAssetShowNumber=this.putTotalAsset;
        this.putTotalAssetShow=BigNumberConvert.toFormatDecimal(this.putTotalAsset,4);
        this.putTotalAssetValueShow=BigNumberConvert.toFormatDecimal(putTotalAssetShowNumber,2);
    }

    getPutUtilizationRatioStyle(){
        return  {
            width:`${this.putUtilizationRatio}%`
        };
    }

    getPutAvailableAssetQuantityStyle(){
        let ratio=this.putAvailableAssetQuantity/this.putTotalAssetShowNumber;
        ratio=BigNumberConvert.toFormatDecimalNumber(ratio*100,2);
        return  {
            width:`${ratio}%`
        };
    }
}

export default new UnderwritingPoolVO();
