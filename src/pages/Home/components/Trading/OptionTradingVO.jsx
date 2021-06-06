import {action, observable} from 'mobx';
import intl from 'react-intl-universal';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import OptionTradingDTOList from './OptionTradingDTOList';
import BigNumberConvert from '../../../../components/BigNumberConvert'
import Countdown from "../../../../components/Countdown";

class OptionTradingVO {
    @observable coinName = OptionTradingConfig.defaultCoin;
    @observable optionType = OptionTradingConfig.defaultOptionType;
    @observable optionRounds = [];
    @observable optionDuration = "";
    @observable optionRound = 0;
    @observable optionAmount = 0;
    @observable optionAmountWei = 0;
    @observable strikePrice = 0;
    @observable strikePriceTxt = "";
    @observable optionCosts = 0;
    @observable optionCostsTxt = "";
    @observable expiryDate = 0;
    @observable expiryDateTxt = "";
    @observable optionAmountMax = 0;
    @observable optionAmountMaxFloat = 0;
    @observable optionAmountMaxTxt = "";

    @observable contractAddress="";
    @observable poolContractAddress="";

    @observable tradingEnable = false;

    getDefaultOptionDuration() {
        if(!this.optionDuration || !this.optionRound){
            return "";
        }
        return `${this.optionDuration}#${this.optionRound}`;
    }

    @action
    reset(){
        this.optionRounds = [];
        this.optionDuration = "";
        this.optionRound = 0;
        this.optionAmount = 0;
        this.optionAmountWei = 0;
        this.strikePrice = 0;
        this.strikePriceTxt = "";
        this.optionCosts = 0;
        this.optionCostsTxt = "";
        this.expiryDate = 0;
        this.expiryDateTxt = "";
        this.optionAmountMax = 0;
        this.optionAmountMaxFloat = 0;
        this.optionAmountMaxTxt = "";

        this.contractAddress="";
        this.poolContractAddress="";

        this.tradingEnable = false;
    }

    @action
    setTradingEnable(tradingEnable){
        this.tradingEnable=tradingEnable;
    }

    @action
    setOptionDurationTxt(optionDurationTxt) {
        let arr=optionDurationTxt.split("#");
        this.optionDuration=arr[0];
        this.optionRound = Number(arr[1]);
    }

    @action
    setOptionAmount(optionAmount){
        this.optionAmount=optionAmount;
        this.optionAmountWei=BigNumberConvert.toPrimitiveValue(optionAmount,this.coinName);
    }

    @action
    setDefaultOptionAmount(){
        let defaultOptionAmount=1;
        if(this.optionAmountMaxFloat<1){
            defaultOptionAmount=this.optionAmountMaxFloat;
        }
        this.setOptionAmount(defaultOptionAmount);
    }

    @action
    setExpiryDate(expiryDate) {
        // expiryDate=1609863401;
        this.expiryDate = expiryDate;
        let _countdownComponent=new Countdown(this.expiryDate);
        this.expiryDateTxt=_countdownComponent.countdownTime;
    }

    @action
    refreshExpiryDate(){
        let _countdownComponent=new Countdown(this.expiryDate);
        this.expiryDateTxt=_countdownComponent.countdownTime;
        this.tradingEnable=!_countdownComponent.isOver;
    }

    @action
    setOptionAmountMax(optionAmountMax){
        this.optionAmountMax=optionAmountMax;
        this.optionAmountMaxTxt=BigNumberConvert.toShowValueFormatDecimalAsset(optionAmountMax,this.coinName);
        this.optionAmountMaxFloat=BigNumberConvert.toShowNumberDecimalAssetSmall(optionAmountMax,this.coinName,4);
        if(this.optionAmountMaxFloat<=0){
            this.optionAmountMaxFloat=BigNumberConvert.toShowNumberDecimalAssetSmall(optionAmountMax,this.coinName,8);
        }
    }

    @action
    setStrikePrice(strikePrice){
        this.strikePrice=strikePrice;
        this.strikePriceTxt=BigNumberConvert.toShowValueFormatDecimalUSDT(strikePrice);
    }

    @action
    setOptionCosts(optionCosts){
        this.optionCosts=optionCosts;

        let costsNum=BigNumberConvert.toShowNumberDecimal(optionCosts,'USDT',8);
        if(costsNum<0.01){
            this.optionCostsTxt=BigNumberConvert.toShowValueFormatDecimal(optionCosts,'USDT',4);
        }else{
            this.optionCostsTxt=BigNumberConvert.toShowValueFormatDecimalUSDT(optionCosts);
        }
    }

    @action
    refresh() {
        if (!OptionTradingDTOList) {
            return;
        }

        this.coinName = OptionTradingDTOList.coinName;
        this.optionType = OptionTradingDTOList.optionType;
        this.optionDuration = this.optionDuration || OptionTradingConfig.defaultOptionDuration;
        this.buildOptionRound(OptionTradingDTOList);
        this.buildCurrentOptionInfo(OptionTradingDTOList);
        this.setDefaultOptionAmount();
    }

    buildCurrentOptionInfo(OptionTradingDTOList) {
        let currentOption = null;
        let optionDtoArr = OptionTradingDTOList.optionRounds;
        if (!(optionDtoArr && optionDtoArr.length)) {
            return;
        }

        for (let optionDto of optionDtoArr) {
            if (this.optionDuration === optionDto.optionDuration) {
                currentOption = optionDto;
            }
        }

        if (currentOption) {
            this.setStrikePrice(currentOption.strikePrice);
            this.setOptionCosts(currentOption.optionCosts);
            this.setExpiryDate(currentOption.expiryDate);
            this.setOptionAmountMax(currentOption.optionAmountMax);
            this.contractAddress=currentOption.optionAddress;
            this.poolContractAddress=currentOption.poolContractAddress;
            this.optionRound=currentOption.optionRound;
        }
    }

    buildOptionRound(OptionTradingDTOList) {
        let optionDtoArr = OptionTradingDTOList.optionRounds;
        if (!(optionDtoArr && optionDtoArr.length)) {
            return;
        }

        let optionDurationDesMap={
            "300":intl.get('page.home.trading.optionDuration.300'),
            "900":intl.get('page.home.trading.optionDuration.900'),
            "1800":intl.get('page.home.trading.optionDuration.1800'),
            "2700":intl.get('page.home.trading.optionDuration.2700'),
            "3600":intl.get('page.home.trading.optionDuration.3600'),
        };

        let optionRounds = [];
        for (let optionDto of optionDtoArr) {
            let optionRound = {
                // "label": `${optionDurationDesMap[optionDto.optionDuration]} -- ${optionDto.optionRound}${intl.get('page.home.trading.optionDuration.round')}`,
                "label": `${optionDurationDesMap[optionDto.optionDuration]}`,
                "value": `${optionDto.optionDuration}#${optionDto.optionRound}`
            };
            optionRounds.push(optionRound);
        }

        this.optionRounds = optionRounds.sort((round1,round2)=>{
            return round2.label.padStart(20,'0') > round1.label.padStart(20,'0') ? -1 : 1;
        });
    }
}

export default new OptionTradingVO();
