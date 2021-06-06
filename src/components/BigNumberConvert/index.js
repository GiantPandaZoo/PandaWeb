import BigNumber from 'bignumber.js'
import OptionTradingConfig from "../../etherscan/OptionTradingConfig";

const units = {
        wei: '0.000000000000000001',
        kwei: '0.000000000000001',
        mwei: '0.000000000001',
        gwei: '0.000000001',
        szabo: '0.000001',
        finney: '0.001',
        ether: '1',
        kether: '1000',
        mether: '1000000',
        gether: '1000000000',
        tether: '1000000000000',
        price: '1',
    },
    scale = {
        wei: '1000000000000000000',
        kwei: '1000000000000000',
        mwei: '1000000000000',
        gwei: '1000000000',
        szabo: '1000000',
        finney: '1000',
        ether: '1',
        kether: '0.001',
        mether: '0.000001',
        gether: '0.000000001',
        tether: '0.000000000001',
        usd: '0.000001',
        price: '1000000',
    };

const scaleMap = ()=>{
    return OptionTradingConfig.getAssetsScaleMap();
};

class BigNumberConvert {
    toNumber(bnString){
        let i = new BigNumber(bnString);
        return i.toNumber();
    }

    toFormat(bnString){
        let i = new BigNumber(bnString);
        return i.toFormat();
    }

    toFormatDecimal(bnString,decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(bnString);
        return i.decimalPlaces(_decimal).toFormat();
    }

    toFormatDecimalNumber(bnString,decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(bnString);
        return i.decimalPlaces(_decimal).toNumber();
    }

    toShowValue(primitiveValue,asset){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).toString();
    }

    toShowValueFormat(primitiveValue,asset){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).toFormat();
    }

    toShowValueFormatDecimal(primitiveValue,asset,decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).decimalPlaces(_decimal).toFormat();
    }

    toShowValueFormatDecimalSmall(primitiveValue,asset,decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).decimalPlaces(_decimal,1).toFormat();
    }

    toShowValueFormatDecimalAsset(primitiveValue,asset){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).decimalPlaces(4).toFormat();
    }

    toShowValueFormatDecimalUSDT(primitiveValue){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()['USDT']['show']);

        let num=(i.times(t)).times(n);
        let _decimal=2;
        if(num < 0.01){
            _decimal=4;
        }
        return num.decimalPlaces(_decimal).toFormat();
    }

    toShowValueFormatDecimalOPA(primitiveValue){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()['OPA']['show']);
        return (i.times(t)).times(n).decimalPlaces(4).toFormat();
    }

    toShowNumber(primitiveValue,asset){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n);
    }

    toShowNumberDecimal(primitiveValue,asset,_decimal){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).decimalPlaces(_decimal).toNumber();
    }

    toShowNumberDecimalAsset(primitiveValue,asset){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).decimalPlaces(4).toNumber();
    }

    toShowNumberDecimalAssetSmall(primitiveValue,asset, decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['show']);
        return (i.times(t)).times(n).decimalPlaces(_decimal,1).toNumber();
    }

    toShowNumberDecimalUSDT(primitiveValue){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()['USDT']['show']);

        let num=(i.times(t)).times(n);
        let _decimal=2;
        if(num < 0.01){
            _decimal=4;
        }
        return num.decimalPlaces(_decimal).toNumber();
    }

    toShowNumberDecimalOPA(primitiveValue){
        let i = new BigNumber(primitiveValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()['OPA']['show']);
        return (i.times(t)).times(n).decimalPlaces(4).toNumber();
    }

    toPrimitiveValue(showValue,asset){
        let i = new BigNumber(showValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['primitive']);
        return (i.times(t)).times(n).toFixed();
    }

    toPrimitiveBigNumber(showValue,asset){
        let i = new BigNumber(showValue);
        let t = new BigNumber('1');
        let n = new BigNumber(scaleMap()[asset]['primitive']);
        return (i.times(t)).times(n);
    }

    toWei(ether){
        let i = new BigNumber(ether);
        let t = new BigNumber(units.ether);
        let n = new BigNumber(scale.wei);
        return (i.times(t)).times(n).toString();
    }

    plusAndToString(x,y,decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(x);
        let t = new BigNumber(y);
        return i.plus(t).decimalPlaces(_decimal).toString();
    }

    timesAndFormat(x,y,decimal){
        let _decimal=decimal||18;
        let i = new BigNumber(x);
        let t = new BigNumber(y);
        return i.times(t).decimalPlaces(_decimal).toFormat();
    }

    minusAndToShowNumberDecimalUSDT(x,y){
        let xNum=new BigNumber(x);
        let yNum=new BigNumber(y);

        let num=xNum.minus(yNum);
        let _decimal=2;
        if(num < 0.01){
            _decimal=4;
        }

        return num.decimalPlaces(_decimal);
    }

    plusAndToShowNumberDecimalUSDT(x,y){
        let xNum=new BigNumber(x);
        let yNum=new BigNumber(y);

        let num=xNum.plus(yNum);
        let _decimal=2;
        if(num < 0.01){
            _decimal=4;
        }

        return num.decimalPlaces(_decimal);
    }

    timesToNumber(primitiveValue, scale, decimal){
        let i = new BigNumber(primitiveValue);
        return i.times(scale).decimalPlaces(decimal).toNumber();
    }
}

export default new BigNumberConvert();
