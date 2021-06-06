import {action, observable} from "mobx";
import OptionTradingConfig from "../../../../etherscan/OptionTradingConfig";

class OptionTradingDTOList {
    @observable coinName = OptionTradingConfig.defaultCoin;
    @observable optionType = OptionTradingConfig.defaultOptionType;
    @observable optionPoolContractAddress = "";

    @observable optionRounds = [];

    @action
    setOptionType(optionType) {
        this.optionType = optionType;
    }

    @action
    setCoinName(coinName) {
        this.coinName = coinName;
    }

    @action
    setOptionType(optionType) {
        this.optionType = optionType;
    }

    @action
    setOptionRounds(optionTradingVoArr) {
        this.optionRounds = optionTradingVoArr;
    }
}

export default new OptionTradingDTOList();
