import {observable} from "mobx";

class OptionTradingDTO {
    @observable coinName = "";
    @observable optionType = "";
    @observable optionRound = "";
    @observable optionDuration = "";
    @observable optionAmount = 0;
    @observable strikePrice = 0;
    @observable optionCosts = 0;
    @observable expiryDate = 0;
    @observable optionAmountMax = 0;
    @observable optionAddress = "";
    @observable poolContractAddress="";
}

export default OptionTradingDTO;
