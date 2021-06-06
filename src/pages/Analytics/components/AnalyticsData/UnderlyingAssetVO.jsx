import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert';
import log from "../../../../components/Log";
import AnalyticsVO from "./AnalyticsVO";

class UnderlyingAssetVO {
    @observable currentPrice = 0;

    @observable totalAssetQuantity = 0;
    @observable totalAssetQuantityShow = 0;
    @observable totalAssetValue = 0;

    @observable callAssetQuantity = 0;
    @observable callAssetQuantityShow = 0;
    @observable callAssetQuantityShowNumber = 0;
    @observable callAssetValue = 0;

    @observable putAssetQuantity = 0;
    @observable putAssetQuantityShow = 0;
    @observable putAssetQuantityShowNumber = 0;
    @observable putAssetValue = 0;

    @observable totalIncomeQuantity = 0;
    @observable totalIncomeQuantityShow = 0;

    @observable callIncomeQuantity = 0;
    @observable callIncomeQuantityShow = 0;

    @observable putIncomeQuantity = 0;
    @observable putIncomeQuantityShow = 0;

    constructor(){
    }

    @action
    reset(){
        this.currentPrice = 0;

        this.totalAssetQuantity = 0;
        this.totalAssetQuantityShow = 0;
        this.totalAssetValue = 0;

        this.callAssetQuantity = 0;
        this.callAssetQuantityShow = 0;
        this.callAssetQuantityShowNumber=0;
        this.callAssetValue = 0;

        this.putAssetQuantity = 0;
        this.putAssetQuantityShow = 0;
        this.putAssetQuantityShowNumber=0;
        this.putAssetValue = 0;

        this.totalIncomeQuantity = 0;
        this.totalIncomeQuantityShow = 0;

        this.callIncomeQuantity = 0;
        this.callIncomeQuantityShow = 0;

        this.putIncomeQuantity = 0;
        this.putIncomeQuantityShow = 0;
    }

    @action
    setCurrentPrice(currentPrice){
        log.debug(`Primitive currentPrice =>${currentPrice}`);
        let _currentPrice=BigNumberConvert.toShowNumber(currentPrice,"USDT");
        log.debug(`currentPrice =>${_currentPrice}`);
        this.currentPrice=_currentPrice;
    }

    @action
    setCallAssetQuantity(callAssetQuantity){
        this.callAssetQuantity=callAssetQuantity;
        this.callAssetQuantityShow=BigNumberConvert.toShowValueFormatDecimal(callAssetQuantity,AnalyticsVO.coinName,4);
        this.callAssetQuantityShowNumber=BigNumberConvert.toShowValue(callAssetQuantity,AnalyticsVO.coinName,4);

        let quantityNumber=BigNumberConvert.toShowNumber(callAssetQuantity,AnalyticsVO.coinName);
        this.callAssetValue=BigNumberConvert.timesAndFormat(quantityNumber,this.currentPrice,2);

        this.setTotalAssetQuantity();
    }

    @action
    addCallAssetQuantity(callAssetQuantity){
        let quantity=BigNumberConvert.plusAndToString(this.callAssetQuantity, callAssetQuantity, 4);
        this.setCallAssetQuantity(quantity);
    }

    @action
    setPutAssetQuantity(putAssetQuantity){
        this.putAssetQuantity=putAssetQuantity;
        this.putAssetQuantityShow=BigNumberConvert.toShowValueFormatDecimal(putAssetQuantity,AnalyticsVO.coinName,4);
        this.putAssetQuantityShowNumber=BigNumberConvert.toShowValue(putAssetQuantity,AnalyticsVO.coinName,4);

        let quantityNumber=BigNumberConvert.toShowNumber(putAssetQuantity,AnalyticsVO.coinName);
        this.putAssetValue=BigNumberConvert.timesAndFormat(quantityNumber,this.currentPrice,2);

        this.setTotalAssetQuantity();
    }

    @action
    addPutAssetQuantity(putAssetQuantity){
        let quantity=BigNumberConvert.plusAndToString(this.putAssetQuantity, putAssetQuantity, 4);
        this.setPutAssetQuantity(quantity);
    }

    @action
    setTotalAssetQuantity(){
        this.totalAssetQuantity=BigNumberConvert.plusAndToString(this.callAssetQuantity, this.putAssetQuantity, 4);
        this.totalAssetQuantityShow=BigNumberConvert.toShowValueFormatDecimal(this.totalAssetQuantity,AnalyticsVO.coinName,4);

        let quantityNumber=BigNumberConvert.toShowNumber(this.totalAssetQuantity,AnalyticsVO.coinName);
        this.totalAssetValue=BigNumberConvert.timesAndFormat(quantityNumber,this.currentPrice,2);
    }

    @action
    setCallIncomeQuantity(callIncomeQuantity){
        this.callIncomeQuantity=callIncomeQuantity;

        let num=BigNumberConvert.toShowNumber(callIncomeQuantity,AnalyticsVO.poolerIncomeAssetName);
        let _decimal=2;
        if(num < 0.01){
            _decimal=4;
        }
        this.callIncomeQuantityShow=BigNumberConvert.toFormatDecimal(num,_decimal);

        this.setTotalIncomeQuantity();
    }

    @action
    addCallIncomeQuantity(callIncomeQuantity){
        let quantity=BigNumberConvert.plusAndToString(this.callIncomeQuantity, callIncomeQuantity, 2);
        this.setCallIncomeQuantity(quantity);
    }

    @action
    setPutIncomeQuantity(putIncomeQuantity){
        this.putIncomeQuantity=putIncomeQuantity;

        let num=BigNumberConvert.toShowNumber(putIncomeQuantity,AnalyticsVO.poolerIncomeAssetName);
        let _decimal=2;
        if(num < 0.01){
            _decimal=4;
        }
        this.putIncomeQuantityShow=BigNumberConvert.toFormatDecimal(num,_decimal);

        this.setTotalIncomeQuantity();
    }

    @action
    addPutIncomeQuantity(putIncomeQuantity){
        let quantity=BigNumberConvert.plusAndToString(this.putIncomeQuantity, putIncomeQuantity, 2);
        this.setPutIncomeQuantity(quantity);
    }

    @action
    setTotalIncomeQuantity(){
        this.totalIncomeQuantity=BigNumberConvert.plusAndToString(this.callIncomeQuantity, this.putIncomeQuantity, 2);
        this.totalIncomeQuantityShow=BigNumberConvert.toShowValueFormatDecimal(this.totalIncomeQuantity,AnalyticsVO.poolerIncomeAssetName,2);
    }
}

export default new UnderlyingAssetVO();
