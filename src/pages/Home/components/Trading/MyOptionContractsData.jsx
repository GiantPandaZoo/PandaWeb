import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert';
import BigNumber from 'bignumber.js'
import Countdown from "../../../../components/Countdown";
import log from '../../../../components/Log';

class MyOptionContractsData {
    @observable coinName='';
    @observable assetName='';
    @observable poolType='';
    @observable duration='';
    @observable durationShow='';
    @observable position=0;
    @observable positionShowNumber=0;
    @observable positionShow='';
    @observable premium='';
    @observable premiumShow='';
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

    @action
    setCoinName(value){
        this.coinName=value;
    }

    @action
    setPoolType(value) {
        if(value=="callPoolContract"){
            this.poolType="CALL";
            this.assetName=this.coinName;
        }else if(value=="putPoolContract"){
            this.poolType = "PUT";
            this.assetName="USDT";
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
    setPosition(value) {
        this.position = value;
        this.positionShowNumber=BigNumberConvert.toShowNumber(this.position,this.coinName,4);
        this.positionShow=`${BigNumberConvert.toShowValueFormatDecimalAsset(this.position,this.coinName)} ${this.coinName}`;
    }

    @action
    setPremium(value) {
        this.premium = value;
        this.premiumShow=`$${BigNumberConvert.toShowValueFormatDecimalUSDT(this.premium)}`;
    }

    @action
    setStrikePrice(value) {
        this.strikePrice = value;
        this.strikePriceShow=`$${BigNumberConvert.toShowValueFormatDecimalUSDT(this.strikePrice)}`;
        this.setRevenue();
    }

    @action
    setCurrentPrice(value, isConverted) {
        this.currentPrice = value;
        if(isConverted){
            this.currentPriceShow=`$${BigNumberConvert.toFormatDecimal(this.currentPrice,2)}`;
        }else{
            this.currentPriceShow=`$${BigNumberConvert.toShowValueFormatDecimalUSDT(this.currentPrice)}`;
        }
    }

    @action
    setRevenue() {
        let profit=0;
        if(this.poolType=="CALL"){
            profit=this.getCallProfit();
        }else if(this.poolType=="PUT"){
            profit=this.getPutProfit();
        }

        this.revenue = profit;
        this.revenueShow=`${BigNumberConvert.toFormatDecimal(this.revenue,4)} ${this.assetName}`;
        this.revenueStyle= profit>0 ? "revenue" : "";
    }

    getCallProfit(){
        let _currentPrice=BigNumberConvert.toPrimitiveBigNumber(this.currentPrice,"USDT");
        let _strikePrice=new BigNumber(this.strikePrice);

        log.debug(`getCallProfit, _currentPrice => ${_currentPrice.toFormat()}, _strikePrice => ${_strikePrice.toFormat()}`);

        if(_currentPrice.comparedTo(_strikePrice)<=0 || _currentPrice.comparedTo(0)<=0 || _strikePrice.comparedTo(0)<=0){
            return 0;
        }

        // let ratio=this.sub(_currentPrice, this.strikePrice)/this.strikePrice;
        // let profit=ratio * this.positionShowNumber;
        let profit=_currentPrice.minus(_strikePrice).times(this.positionShowNumber).div(_strikePrice);
        log.debug(`profit => ${profit.toFormat()}`);
        return profit;
    }

    getPutProfit(){
        let _currentPrice=BigNumberConvert.toPrimitiveBigNumber(this.currentPrice,"USDT");
        let _strikePrice=new BigNumber(this.strikePrice);

        log.debug(`getPutProfit, _currentPrice => ${_currentPrice.toFormat()}, _strikePrice => ${_strikePrice.toFormat()}`);

        if(_currentPrice.comparedTo(_strikePrice)>=0 || _currentPrice.comparedTo(0)<=0 || _strikePrice.comparedTo(0)<=0){
            return 0;
        }

        // let ratio=this.sub(this.strikePrice, _currentPrice)/this.strikePrice;
        // let holderShare=ratio * this.positionShowNumber;
        // let profit=holderShare * this.strikePrice;
        let profit=_strikePrice.minus(_currentPrice).times(this.positionShowNumber);
        profit=BigNumberConvert.toShowNumber(profit,"USDT");
        log.debug(`profit => ${profit.toFormat()}`);
        return profit;
    }

    @action
    setExpiryDate(value) {
        // value=1609864055;
        this.expiryDate = value;

        let _countdownComponent=new Countdown(this.expiryDate);
        this.expiryDateShow=_countdownComponent.endTimeFormat;
        this.countdown=_countdownComponent.countdownTime;
        if(!_countdownComponent.isOver){
            this.countdownStyle='countdown';
        }else{
            this.countdownStyle='';
        }
    }

    @action
    refreshExpiryDate(){
        this.setExpiryDate(this.expiryDate);
    }
}

export default MyOptionContractsData;
