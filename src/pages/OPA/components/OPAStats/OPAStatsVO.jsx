import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";
import BigNumber from "bignumber.js";

class OPAStatsVO {
    @observable price = 0;
    @observable priceShow = 0;
    @observable priceShowNumber = 0;
    @observable marketCap = 0;
    @observable circSupply = 0;
    @observable circSupplyShow = '';
    @observable circSupplyShowNumber = 0;

    @action
    setPrice(value){
        this.price=value;
        this.priceShow=BigNumberConvert.toShowValueFormatDecimalOPA(value);
        this.priceShowNumber=BigNumberConvert.toShowNumberDecimalOPA(value);

        this.setMarketCap();
    }

    @action
    setMarketCap(){
        let marketCapValue=new BigNumber(this.priceShowNumber).times(this.circSupplyShowNumber);
        this.marketCap=BigNumberConvert.toFormatDecimal(marketCapValue,2);
    }

    @action
    setCircSupply(value){
        this.circSupply=value;
        this.circSupplyShow=BigNumberConvert.toFormat(value);
        this.circSupplyShowNumber=value;

        this.setMarketCap();
    }
}

export default new OPAStatsVO();
