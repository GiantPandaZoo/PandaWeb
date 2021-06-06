import {action, observable} from 'mobx';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import BigNumberConvert from '../../../../components/BigNumberConvert'

class PoolerVO {
    @observable coinName = OptionTradingConfig.defaultCoin;
    @observable optionType = OptionTradingConfig.defaultOptionType;
    @observable depositCoinName = "ETH";
    @observable quantity = 0;
    @observable quantityWei = 0;
    @observable balanceOf = 0;
    @observable balanceOfFloat = 0;
    @observable balanceOfTxt = "";
    @observable apy = 0;
    @observable apr = 0;

    @observable depositEnable = false;
    @observable getBalanceSuccess = false;

    constructor(){
        this.setOptionType(OptionTradingConfig.defaultOptionType);
    }

    @action
    reset(){
        this.quantity = 0;
        this.quantityWei = 0;
        this.balanceOf = 0;
        this.balanceOfFloat = 0;
        this.balanceOfTxt = "";
        this.apy = 0;
        this.apr = 0;
        this.depositEnable = false;
        this.getBalanceSuccess = false;
    }

    @action
    setCoinName(coinName) {
        this.coinName = coinName;
        this.setOptionType(this.optionType);
    }

    @action
    setOptionType(optionType){
        this.optionType=optionType ;

        if(this.isCallOptionType()){
            this.depositCoinName=this.coinName;
        }else{
            this.depositCoinName="USDT";
        }
    }

    @action
    setDepositEnable(balanceOf){
        this.depositEnable=balanceOf ;
    }

    @action
    setBalanceSuccess(getBalanceSuccess){
        this.getBalanceSuccess=getBalanceSuccess ;
    }

    @action
    setQuantity(quantity){
        this.quantity=quantity;
        this.quantityWei=BigNumberConvert.toPrimitiveValue(quantity,this.depositCoinName);
    }

    @action
    setDefaultQuantity(){
        let defaultQuantity=1;
        if(this.balanceOfFloat<1){
            defaultQuantity=this.balanceOfFloat;
        }
        this.setQuantity(defaultQuantity);
    }

    @action
    setBalanceOf(balanceOf){
        this.getBalanceSuccess=true;
        this.balanceOf=balanceOf;
        this.balanceOfTxt=BigNumberConvert.toShowValueFormatDecimalSmall(balanceOf,this.depositCoinName, 4);
        this.balanceOfFloat=BigNumberConvert.toShowNumberDecimalAssetSmall(balanceOf,this.depositCoinName, 4);

        this.setDefaultQuantity();

        if(this.balanceOf>0){
            this.depositEnable=true;
        }else{
            this.depositEnable=false;
        }
    }

    @action
    setAPY(apy){
        this.apy=BigNumberConvert.toFormatDecimalNumber(apy, 2);
    }

    @action
    setAPR(apr){
        this.apr=BigNumberConvert.toFormatDecimalNumber(apr, 2);
    }

    isCallOptionType(){
        return this.optionType=="callPoolContract";
    }
}

export default new PoolerVO();
