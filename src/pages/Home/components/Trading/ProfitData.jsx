import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert';
import log from '../../../../components/Log';

class ProfitData {
    @observable coinName='';
    @observable coinIcon='';
    @observable assetName='';
    @observable poolType='';
    @observable profit = 0;
    @observable profitTxt = "0";
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

    @action
    setProfit(value) {
        this.profit=value;

        if(value>0){
            this.claimEnable=true;
        }else{
            this.profit=0;
            this.claimEnable=false;
        }

        let profitNumber=BigNumberConvert.toShowNumber(this.profit,this.coinName);
        if(profitNumber < 0.0001){
            this.profitTxt=BigNumberConvert.toShowValueFormatDecimal(this.profit,this.coinName,8);
        }else{
            this.profitTxt=BigNumberConvert.toShowValueFormatDecimalAsset(this.profit,this.coinName);
        }
    }
}

export default ProfitData;
