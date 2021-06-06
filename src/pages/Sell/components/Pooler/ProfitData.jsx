import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert';
import BigNumber from 'bignumber.js'
import log from '../../../../components/Log';

class ProfitData {
    incomeAssetCoinName = "USDT";
    
    @observable coinName='';
    @observable coinIcon='';
    @observable assetName='';
    @observable poolType='';

    @observable assetQuantity = 0;
    @observable assetQuantityTxt = "";
    @observable assetQuantityWei = 0;

    @observable assetPoolQuantity = 0;
    @observable assetPoolQuantityTxt = "";

    @observable assetAvailableQuantity = 0;
    @observable assetAvailableQuantityTxt = "";

    @observable assetContribution = 0;

    @observable withdrawAbleQuantity = 0;
    @observable withdrawAbleQuantityShow = 0;
    @observable withdrawQuantity = 0;
    @observable withdrawQuantityInt = "";

    @observable withdrawEnable = false;

    @observable incomeQuantity = 0;
    @observable incomeQuantityTxt = 0;

    @observable apr = 0;

    @observable claimEnable = false;

    @action
    setCoinName(value){
        this.coinName=value;

        let coinIconMap = {
            BTCB:'coin_icon_btc',
            ETH:'coin_icon_eth',
            BNB:'coin_icon_bnb',
        };
        this.coinIcon=coinIconMap[value] || '';
    }

    @action
    setPoolType(value) {
        this.poolType=value;

        if(value=="callPoolContract"){
            this.assetName=this.coinName;
        }else if(value=="putPoolContract"){
            this.assetName="USDT";
        }
    }

    isCallOptionType(){
        return this.poolType=="callPoolContract";
    }

    @action
    setWithdrawEnable(withdrawEnable){
        this.withdrawEnable=withdrawEnable ;
    }

    @action
    setAssetQuantity(assetQuantity){
        this.assetQuantity=assetQuantity;

        let number=BigNumberConvert.toShowNumber(this.assetQuantity,this.assetName);
        if(number < 0.0001){
            this.assetQuantityTxt=BigNumberConvert.toShowValueFormatDecimalSmall(this.assetQuantity,this.assetName,8);
        }else{
            this.assetQuantityTxt=BigNumberConvert.toShowValueFormatDecimalSmall(this.assetQuantity,this.assetName,4);
        }

        this.assetQuantityWei=BigNumberConvert.toPrimitiveValue(assetQuantity,this.assetName);
    }

    @action
    setAssetPoolQuantity(assetPoolQuantity){
        this.assetPoolQuantity=assetPoolQuantity;

        let number=BigNumberConvert.toShowNumber(this.assetPoolQuantity,this.assetName);
        if(number < 0.0001){
            this.assetPoolQuantityTxt=BigNumberConvert.toShowValueFormatDecimal(this.assetPoolQuantity,this.assetName,8);
        }else{
            this.assetPoolQuantityTxt=BigNumberConvert.toShowValueFormatDecimal(this.assetPoolQuantity,this.assetName,4);
        }
    }

    @action
    setAssetAvailableQuantity(assetAvailableQuantity){
        this.assetAvailableQuantity=assetAvailableQuantity;

        let number=BigNumberConvert.toShowNumber(this.assetAvailableQuantity,this.assetName);
        if(number < 0.0001){
            this.assetAvailableQuantityTxt=BigNumberConvert.toShowValueFormatDecimalSmall(this.assetAvailableQuantity,this.assetName,8);
        }else{
            this.assetAvailableQuantityTxt=BigNumberConvert.toShowValueFormatDecimalSmall(this.assetAvailableQuantity,this.assetName,4);
        }
    }

    @action
    setWithdrawAbleQuantity(){
        this.withdrawAbleQuantity=Math.min(this.assetQuantity,this.assetAvailableQuantity);
        this.withdrawAbleQuantityShow=BigNumberConvert.toShowNumberDecimalAssetSmall(this.withdrawAbleQuantity,this.assetName,5);
        this.withdrawEnable=this.withdrawAbleQuantity>0;
        if(this.withdrawEnable){
            this.setWithdrawQuantity(this.withdrawAbleQuantityShow);
        }
    }

    @action
    setWithdrawQuantity(withdrawQuantity){
        this.withdrawQuantity=withdrawQuantity;
        this.withdrawQuantityInt=BigNumberConvert.toPrimitiveValue(this.withdrawQuantity,this.assetName);
    }

    @action
    setClaimEnable(claimEnable){
        this.claimEnable=claimEnable ;
    }

    @action
    setIncomeQuantity(incomeQuantity){
        this.incomeQuantity=incomeQuantity;

        let incomeNumber=BigNumberConvert.toShowNumber(this.incomeQuantity,this.incomeAssetCoinName);
        if(incomeNumber < 0.0001){
            this.incomeQuantityTxt=BigNumberConvert.toShowValueFormatDecimalSmall(this.incomeQuantity,this.incomeAssetCoinName,8);
        }else{
            this.incomeQuantityTxt=BigNumberConvert.toShowValueFormatDecimalSmall(this.incomeQuantity,this.incomeAssetCoinName,4);
        }

        this.claimEnable=incomeNumber>0;
    }

    @action
    setAPR(apr){
        this.apr=BigNumberConvert.toFormatDecimalNumber(apr, 2);
    }
    
    getAssetContribution(){
        if(this.assetPoolQuantity==0){
            return 0;
        }else{
            let c=this.assetQuantity / this.assetPoolQuantity * 100;
            if(c>100){
                c=100;
            }
            return c.toFixed(2);
        }
    }

    getAssetContributionTxt(){
        return `${this.getAssetContribution()}%`;
    }

    getAssetContributionStyle(){
        return  {
            width:this.getAssetContributionTxt()
        };
    }

    getAssetContributionDesWidth(){
        let contribution=this.getAssetContribution();
        return 100-contribution;
    }

    getAssetContributionDesStyle(){
        return  {
            width:`${this.getAssetContributionDesWidth()}%`
        };
    }

}

export default ProfitData;
