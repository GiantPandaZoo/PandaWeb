import {action, observable} from 'mobx';
import BigNumberConvert from '../../../../components/BigNumberConvert'
import OptionTradingVOList from "./OptionTradingDTOList";

class ProfitChartVO {
    currentPrice=0;
    @observable currentPriceShow=0;

    strikePrice=0;
    optionPremium=0;
    cost=0;

    @observable chartData=[];
    @observable annotationStrikePrice={
        start:[],
        end:[]
    };
    @observable annotationCost={
        start:[],
        end:[]
    };
    @observable currentPriceTips=[];
    @observable chartFillColor="";
    @observable isLoaded=false;

    @action
    setIsLoaded(isLoaded){
        this.isLoaded=isLoaded;
    }

    @action
    setChartFillColor(chartFillColor){
        this.chartFillColor=chartFillColor;
    }

    @action
    setCurrentPrice(currentPrice){
        this.currentPrice=currentPrice;
        this.currentPriceShow=BigNumberConvert.toShowNumberDecimalUSDT(currentPrice);
    }

    @action
    setAnnotationStrikePrice(annotationStrikePrice){
        this.annotationStrikePrice=annotationStrikePrice;
    }

    @action
    setAnnotationCost(annotationCost){
        this.annotationCost=annotationCost;
    }

    @action
    setStrikePrice(strikePrice){
        this.strikePrice=BigNumberConvert.toShowNumberDecimalUSDT(strikePrice);
        if(OptionTradingVOList.optionType=="callPoolContract"){
            this.cost=this.strikePrice+this.optionPremium;
        }else{
            this.cost=this.strikePrice-this.optionPremium;
        }
    }

    @action
    setOptionPremium(optionPremium){
        let optionPremiumTemp=BigNumberConvert.toShowNumberDecimalUSDT(optionPremium);
        if(optionPremiumTemp<=0){
            optionPremiumTemp=BigNumberConvert.toShowNumberDecimalAsset(optionPremium,'USDT',4);
        }
        this.optionPremium=optionPremiumTemp;

        if(OptionTradingVOList.optionType=="callPoolContract"){
            this.cost=this.strikePrice+this.optionPremium;
        }else{
            this.cost=this.strikePrice-this.optionPremium;
        }
    }

    @action
    setCurrentPriceTips(currentPriceTips){
        this.currentPriceTips=currentPriceTips;
    }

    @action
    buildChart(){
        if(OptionTradingVOList.optionType=="callPoolContract"){
            this.setChartFillColor("l(0) 0:#ffffff 0.5:#FFDAAA 0.5:#75F9B7 1:#ffffff");
            this.chartData=this.buildCallPriceArr();
        }else{
            this.setChartFillColor("l(0) 0:#ffffff 0.5:#75F9B7 0.5:#FFDAAA 1:#ffffff");
            this.chartData=this.buildPutPriceArr();
        }

        this.setIsLoaded(true);
    }

    buildCallPriceArr(){
        let priceArr=[];

        let costStr=BigNumberConvert.toFormatDecimalNumber(this.cost,4).toString();
        priceArr.unshift({
            "price": costStr,
            "Expected Profit": 0,
            "profit": "loss"
        });

        let currentPriceStr=this.currentPriceShow.toString();
        let currentPriceRevenue=this.getCallRevenue(this.currentPriceShow ,this.cost);
        let strikePriceStr=this.strikePrice.toString();
        let stickPriceRevenueRatio=this.getCallRevenue(this.strikePrice,this.cost);

        if(currentPriceStr<strikePriceStr){
            priceArr.unshift({
                "price": strikePriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
            currentPriceRevenue=stickPriceRevenueRatio;
            priceArr.unshift({
                "price": currentPriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
        }else if(currentPriceStr>=strikePriceStr && currentPriceStr<costStr){
            priceArr.unshift({
                "price": currentPriceStr,
                "Expected Profit": currentPriceRevenue,
                "profit": "loss"
            });
            priceArr.unshift({
                "price": strikePriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
        }else if(currentPriceStr>=costStr){
            priceArr.unshift({
                "price": strikePriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
            priceArr.push({
                "price": currentPriceStr,
                "Expected Profit": currentPriceRevenue,
                "profit": "profit"
            });
        }

        let profitNodeCount=3;
        let lossNodeCount=3;
        if(currentPriceStr<=costStr){
            profitNodeCount=4;
            lossNodeCount=2;
        }else{
            profitNodeCount=3;
            lossNodeCount=3;
        }

        let firstItem=priceArr[0];
        let firstItemPrice=firstItem["price"];
        firstItemPrice=firstItemPrice*1;
        for (let i = 1; i < lossNodeCount; i++) {
            priceArr.unshift({
                "price": BigNumberConvert.toFormatDecimalNumber(firstItemPrice - 100 * i,2).toString(),
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
        }

        let lastItemPrice=priceArr[priceArr.length-1]["price"];
        let preLastItemPrice=priceArr[priceArr.length-2]["price"];
        let difference=lastItemPrice-preLastItemPrice;
        for (let i = 1; i < profitNodeCount; i++) {
            let price=lastItemPrice*1 + i*difference;
            let theRatio=this.getCallRevenue(price ,this.cost);
            priceArr.push({
                "price": BigNumberConvert.toFormatDecimalNumber(price,2).toString(),
                "Expected Profit": theRatio,
                "profit": "profit"
            });
        }

        this.setAnnotationCost({
            start:[costStr, 0],
            end:[costStr, stickPriceRevenueRatio]
        });

        this.setAnnotationStrikePrice({
            start:[strikePriceStr, 0],
            end:[strikePriceStr, stickPriceRevenueRatio]
        });

        this.setCurrentPriceTips([this.currentPriceShow.toString(),currentPriceRevenue]);

        return priceArr;
    }

    getCallRevenue(price,cost){
        let ratio=(price-cost)/cost;
        return BigNumberConvert.toFormatDecimalNumber(ratio,4);
    }

    buildPutPriceArr(){
        let priceArr=[];

        let costStr=BigNumberConvert.toFormatDecimalNumber(this.cost,2).toString();
        priceArr.push({
            "price": costStr,
            "Expected Profit": 0,
            "profit": "loss"
        });

        let currentPriceStr=this.currentPriceShow.toString();
        let currentPriceRevenue=this.getPutRevenue(this.currentPriceShow ,this.cost);
        let strikePriceStr=this.strikePrice.toString();
        let stickPriceRevenueRatio=this.getPutRevenue(this.strikePrice,this.cost);

        if(currentPriceStr>strikePriceStr){
            priceArr.push({
                "price": strikePriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "profit"
            });
            currentPriceRevenue=stickPriceRevenueRatio;
            priceArr.push({
                "price": currentPriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "profit"
            });
        }else if(currentPriceStr>costStr && currentPriceStr<=strikePriceStr){
            priceArr.push({
                "price": currentPriceStr,
                "Expected Profit": currentPriceRevenue,
                "profit": "profit"
            });
            priceArr.push({
                "price": strikePriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "profit"
            });
        }else if(currentPriceStr<=costStr){
            priceArr.push({
                "price": strikePriceStr,
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
            priceArr.unshift({
                "price": currentPriceStr,
                "Expected Profit": currentPriceRevenue,
                "profit": "profit"
            });
        }

        let profitNodeCount=3;
        let lossNodeCount=3;
        if(currentPriceStr<costStr){
            profitNodeCount=2;
            lossNodeCount=4;
        }else if(currentPriceStr==costStr){
            profitNodeCount=3;
            lossNodeCount=4;
        }else if(currentPriceStr==strikePriceStr){
            profitNodeCount=4;
            lossNodeCount=3;
        }else{
            profitNodeCount=4;
            lossNodeCount=2;
        }

        let lastItemPrice=priceArr[priceArr.length-1]["price"];
        lastItemPrice=lastItemPrice*1;
        for (let i = 1; i < lossNodeCount; i++) {
            priceArr.push({
                "price": BigNumberConvert.toFormatDecimalNumber(lastItemPrice + 100 * i,2).toString(),
                "Expected Profit": stickPriceRevenueRatio,
                "profit": "loss"
            });
        }

        let firstItemPrice=priceArr[0]["price"];
        let secondItemPrice=priceArr[1]["price"];
        let difference=secondItemPrice-firstItemPrice;
        for (let i = 1; i < profitNodeCount; i++) {
            let price=firstItemPrice*1 - i*difference;
            let theRatio=this.getPutRevenue(price ,this.cost);
            priceArr.unshift({
                "price": BigNumberConvert.toFormatDecimalNumber(price,2).toString(),
                "Expected Profit": theRatio,
                "profit": "profit"
            });
        }

        this.setAnnotationCost({
            start:[costStr, 0],
            end:[costStr, stickPriceRevenueRatio]
        });

        this.setAnnotationStrikePrice({
            start:[strikePriceStr, 0],
            end:[strikePriceStr, stickPriceRevenueRatio]
        });

        this.setCurrentPriceTips([this.currentPriceShow.toString(),currentPriceRevenue]);

        return priceArr;
    }

    getPutRevenue(price,cost){
        let ratio=(cost-price)/cost;
        return BigNumberConvert.toFormatDecimalNumber(ratio,4);
    }
}

export default new ProfitChartVO();
