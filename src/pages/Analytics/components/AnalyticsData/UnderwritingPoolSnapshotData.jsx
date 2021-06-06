import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert';
import AnalyticsVO from "./AnalyticsVO";
import Countdown from "../../../../components/Countdown";

class UnderwritingPoolSnapshotData {
    @observable poolType='';
    @observable duration='';
    @observable durationShow='';
    @observable position='';
    @observable totalSupply='';
    @observable positionShow='';
    @observable available='';
    @observable availableShow='';
    @observable strikePrice='';
    @observable strikePriceShow='';
    @observable currentPrice='';
    @observable currentPriceShow='';
    @observable revenue='';
    @observable revenueShow='';
    @observable revenueStyle='';
    @observable expiryDate='';
    @observable expiryDateShow='';
    @observable countdown='';
    @observable countdownStyle='';
    @observable countdownComponent='';

    @action
    setPoolType(value) {
        if(value=="callPoolContract"){
            this.poolType="CALL";
        }else if(value=="putPoolContract"){
            this.poolType = "PUT";
        }else{
            this.poolType = value;
        }
    }

    @action
    setDuration(value) {
        this.duration = value;

        let durationMin=this.duration / 60;
        this.durationShow = `${durationMin}min`;
    }

    @action
    setTotalSupply(value) {
        this.totalSupply = value;
        this.setPosition();
    }

    @action
    setPosition() {
        if(this.totalSupply && this.available){
            this.position = this.totalSupply-this.available;
            this.positionShow=`${BigNumberConvert.toShowValueFormatDecimal(this.position,AnalyticsVO.coinName,4)} ${AnalyticsVO.coinName}`;
        }
    }

    @action
    setAvailable(value) {
        this.available = value;
        this.availableShow=`${BigNumberConvert.toShowValueFormatDecimal(this.available,AnalyticsVO.coinName,4)} ${AnalyticsVO.coinName}`;
        this.setPosition();
    }

    @action
    setStrikePrice(value) {
        this.strikePrice = value;
        this.strikePriceShow=`$${BigNumberConvert.toShowValueFormatDecimal(this.strikePrice,"USDT",2)}`;
    }

    @action
    setCurrentPrice(value, isConverted) {
        this.currentPrice = value;
        if(isConverted){
            this.currentPriceShow=`$${BigNumberConvert.toFormatDecimal(this.currentPrice,2)}`;
        }else{
            this.currentPriceShow=`$${BigNumberConvert.toShowValueFormatDecimal(this.currentPrice,"USDT",2)}`;
        }
    }

    @action
    setRevenue(value) {
        this.revenue = value;
        this.revenueShow=`${BigNumberConvert.toShowValueFormatDecimal(this.revenue,AnalyticsVO.poolerIncomeAssetName,2)} ${AnalyticsVO.poolerIncomeAssetName}`;
        this.revenueStyle= value>0 ? "revenue" : "";
    }

    @action
    setExpiryDate(value) {
        this.expiryDate = value;

        let _countdownComponent=new Countdown(this.expiryDate);
        this.countdownComponent=_countdownComponent;
        this.expiryDateShow=_countdownComponent.endTimeFormat;
        this.countdown=_countdownComponent.countdownTime;
        if(!_countdownComponent.isOver){
            this.countdownStyle='countdown';
        }else{
            this.countdownStyle='';
        }
    }
}

export default UnderwritingPoolSnapshotData;
