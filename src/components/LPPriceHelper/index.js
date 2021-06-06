import OptionTradingConfig from '../../etherscan/OptionTradingConfig';
import log from '../Log';
import BigNumber from 'bignumber.js'
import BigNumberConvert from '../BigNumberConvert'

class LPPriceHelper {

    /**
     * load LP price
     * case 1: tokenPair=[OPA,USDT]
     * case 2: tokenPair=[OPA,BNB]
     * @param dexName
     * @param tokenPair
     */
    loadTokenPrice(dexName, tokenPair, callback) {
        dexName=dexName||'Pancake';
        log.debug(`load LP price from ${dexName} ...`);

        let contractConfig = OptionTradingConfig.LP[dexName]["router"];
        let contractAddress = contractConfig.address();
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

        let amountOut=new BigNumber(10).pow(18).toFixed();

        let address1=OptionTradingConfig.contractConfig[tokenPair[0]].hotPotToken.address();
        let address2=OptionTradingConfig.contractConfig[tokenPair[1]].hotPotToken.address();

        let addressArr=[address1,address2];

        if(tokenPair[1] != 'USDT'){
            let usdtAddress=OptionTradingConfig.contractConfig['USDT'].hotPotToken.address();
            addressArr.push(usdtAddress);
        }

        contract.methods
            .getAmountsOut(amountOut,addressArr)
            .call()
            .then((amounts) => {
                log.debug(`loadLPPrice result => ${amounts}`);
                callback(amounts[amounts.length-1]);
            });
    }

    /**
     * load LP token price
     * case 1: tokenPair=[OPA,USDT]
     * case 2: tokenPair=[OPA,BNB]
     * @param dexName
     * @param tokenPair
     */
    loadLPTokenPrice(dexName, tokenPair, callback, tokenPairAddress) {
        dexName=dexName||'Pancake';
        log.debug(`load LP token price from ${dexName} ...`);

        let handler=this;
        handler.loadLPTokenAddress(dexName, tokenPair, tokenPairAddress, lpTokenAddress => {
            handler.loadLPTokenTotalSupply(dexName,lpTokenAddress, totalSupply => {
                handler.loadLPTokenReserves(dexName, tokenPair, lpTokenAddress, reserve => {
                    let bn = new BigNumber(reserve);
                    // 2 * (_reserve0 / totalSupply)
                    let priceAsset = bn.times(2).div(totalSupply);

                    log.debug(`priceAsset result => ${priceAsset}`);

                    if(tokenPair[1] === 'USDT'){
                        callback(BigNumberConvert.toPrimitiveValue(priceAsset,'USDT'));
                    }else{
                        let usdtArr=[tokenPair[1],'USDT'];
                        handler.loadTokenPrice(dexName,usdtArr,price => {
                            let priceBN = new BigNumber(price);
                            let priceResult = priceBN.times(priceAsset);
                            log.debug(`priceAsset to USDT result => ${priceResult}`);
                            callback(priceResult);
                        });
                    }
                })
            });
        });
    }

    loadLPTokenAddress(dexName, tokenPair, tokenPairAddress, callback) {
        if(tokenPairAddress){
            callback(tokenPairAddress);
        }else{
            dexName=dexName||'Pancake';
            log.debug(`loadLPTokenAddress from ${dexName} ...`);

            let contractConfig = OptionTradingConfig.LP[dexName]["factory"];
            let contractAddress = contractConfig.address();
            let contractAbi = contractConfig.abi;

            let contract = new window.web3.eth.Contract(contractAbi, contractAddress);

            let address1=OptionTradingConfig.contractConfig[tokenPair[0]].hotPotToken.address();
            let address2=OptionTradingConfig.contractConfig[tokenPair[1]].hotPotToken.address();

            contract.methods
                .getPair(address1,address2)
                .call()
                .then((lpTokenAddress) => {
                    log.debug(`load LP token address result => ${lpTokenAddress}`);
                    callback(lpTokenAddress);
                });
        }
    }

    loadLPTokenTotalSupply(dexName, lpTokenAddress, callback) {
        dexName=dexName||'Pancake';
        log.debug(`loadLPTokenTotalSupply from ${dexName} ...`);

        let contractConfig = OptionTradingConfig.LP[dexName]["LP_Token"];
        let contractAddress = lpTokenAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .totalSupply()
            .call()
            .then((totalSupply) => {
                log.debug(`loadLPTokenTotalSupply result => ${totalSupply}`);
                callback(totalSupply);
            });
    }

    loadLPTokenReserves(dexName, tokenPair, lpTokenAddress, callback) {
        dexName=dexName||'Pancake';
        log.debug(`loadLPTokenTotalSupply from ${dexName} ...`);

        let contractConfig = OptionTradingConfig.LP[dexName]["LP_Token"];
        let contractAddress = lpTokenAddress;
        let contractAbi = contractConfig.abi;

        let contract = new window.web3.eth.Contract(contractAbi, contractAddress);
        contract.methods
            .getReserves()
            .call()
            .then((result) => {
                log.debug(`loadLPTokenReserves result => ${result[0]}`);
                // console.log(result);
                // callback(result[0]);

                contract.methods
                    .token0()
                    .call()
                    .then(token0 => {
                        log.debug(`loadLPTokenReserves token0 => ${token0}`);

                        let address0=OptionTradingConfig.contractConfig[tokenPair[0]].hotPotToken.address();
                        if(token0.toUpperCase() === address0.toUpperCase()){
                            callback(result[1]);
                        }else{
                            callback(result[0]);
                        }
                    });
            });
    }
}

export default new LPPriceHelper()
