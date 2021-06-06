import {action, observable} from 'mobx';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import BigNumberConvert from '../../../../components/BigNumberConvert'
import PoolerVO from "./PoolerVO";

class ProfitWithdrawVO {
    @observable coinName = "ETH";
    @observable coinIcon='';
    @observable assetName='';
    @observable poolType='';

    @observable assetAvailableQuantity = 0;
    @observable assetAvailableQuantityTxt = "";

    @observable withdrawAbleQuantity = 0;
    @observable withdrawAbleQuantityShow = 0;
    @observable withdrawQuantity = 0;
    @observable withdrawQuantityInt = "";

    @observable withdrawEnable = false;
    @observable showWithdrawDialog = false;

    @action
    reset(){
        this.coinName = "ETH";
        this.coinIcon = '';
        this.assetName = '';
        this.poolType = '';

        this.assetAvailableQuantity = 0;
        this.assetAvailableQuantityTxt = "";

        this.withdrawAbleQuantity = 0;
        this.withdrawAbleQuantityShow = 0;
        this.withdrawQuantity = 0;
        this.withdrawQuantityInt = "";

        this.withdrawEnable = false;
        this.showWithdrawDialog = false;
    }

    @action
    setShowWithdrawDialog(showWithdrawDialog){
        this.showWithdrawDialog=showWithdrawDialog;
    }

    @action
    setByProfitData(profitData) {
        this.coinName=profitData.coinName;
        this.coinIcon=profitData.coinIcon;
        this.assetName=profitData.assetName;
        this.poolType=profitData.poolType;

        this.assetAvailableQuantity=profitData.assetAvailableQuantity;
        this.assetAvailableQuantityTxt=profitData.assetAvailableQuantityTxt;

        this.withdrawAbleQuantity=profitData.withdrawAbleQuantity;
        this.withdrawAbleQuantityShow=profitData.withdrawAbleQuantityShow;
        this.withdrawQuantity=profitData.withdrawQuantity;
        this.withdrawQuantityInt=profitData.withdrawQuantityInt;

        this.withdrawEnable = profitData.withdrawEnable;
    }

    @action
    setWithdrawQuantity(withdrawQuantity){
        this.withdrawQuantity=withdrawQuantity;
        this.withdrawQuantityInt=BigNumberConvert.toPrimitiveValue(this.withdrawQuantity,this.coinName);
    }
}

export default new ProfitWithdrawVO();
