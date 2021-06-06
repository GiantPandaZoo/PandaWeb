import {action, observable} from 'mobx';
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";

class AnalyticsVO {
    callOptionType="callPoolContract";
    putOptionType="putPoolContract";

    poolerIncomeAssetName="USDT";

    @observable coinName = OptionTradingConfig.defaultCoin;

    @action
    setCoinName(coinName) {
        this.coinName = coinName;
    }
}

export default new AnalyticsVO();
