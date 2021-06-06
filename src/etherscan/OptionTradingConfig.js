import ContractAddressConfig from './ContractAddressConfig';

import USDT from './abi/USDTToken_abi';
import WBTC from './abi/WBTC_abi';
import ETH from './abi/ETHToken_abi';
import OPA from './abi/OPA_abi';
import TEST_ASSET from './abi/TEST_ASSET_abi';
import ETHCallOptionPool from './abi/ETHCallOptionPool_abi';
import WBTCCallOptionPool from './abi/WBTCCallOptionPool_abi';
import BNBCallOptionPool from './abi/BNBCallOptionPool_abi';
import ETHCallPoolerToken from './abi/ETHCallPoolerToken_abi';
import WBTCCallPoolerToken from './abi/WBTCCallPoolerToken_abi';
import BNBCallPoolerToken from './abi/BNBCallPoolerToken_abi';
import ETHPutOptionPool from './abi/ETHPutOptionPool_abi';
import WBTCPutOptionPool from './abi/WBTCPutOptionPool_abi';
import BNBPutOptionPool from './abi/BNBPutOptionPool_abi';
import ETHPutPoolerToken from './abi/ETHPutPoolerToken_abi';
import WBTCPutPoolerToken from './abi/WBTCPutPoolerToken_abi';
import BNBPutPoolerToken from './abi/BNBPutPoolerToken_abi';
import Option from './abi/Option_abi';
import Staking from './abi/Staking_abi';

import CurrentChainStorage from "../components/Web3/CurrentChainStorage";
import DEXRouter_Pancake_abi from "./abi/DEXRouter_Pancake_abi";
import DEXFactory_Pancake_abi from "./abi/DEXFactory_Pancake_abi";
import DEXTokenPair_Pancake_abi from "./abi/DEXTokenPair_Pancake_abi";
import ADA_abi from "./abi/ADA_abi";
import BNB_abi from "./abi/BNB_abi";

const OptionTradingConfig = {
    defaultCoin: 'BTCB',
    defaultOptionType: 'callPoolContract',
    defaultOptionDuration: '300',

    defaultChain:{
        id: 56,
        name: 'BSC mainnet',
    },

    defaultApproveAllowance: '10000000000000000000000',
    defaultApproveAllowance_56: '100000000000000000000000000',
    getDefaultApproveAllowance: function(){
        return this[`defaultApproveAllowance_${CurrentChainStorage.chainId}`] || this['defaultApproveAllowance'];
    },

    defaultApproveThreshold: '100000000000',
    defaultApproveThreshold_56: '1000000000000000000',
    getDefaultApproveThreshold: function(){
        return this[`defaultApproveThreshold_${CurrentChainStorage.chainId}`] || this['defaultApproveThreshold'];
    },

    // assets:['USDT','BTCB','ETH'],
    getAssetsScaleMap: function(){
        let scaleMap={};
        for(let assetConfig of this.assets){
            let assetName=assetConfig.name;
            let show=assetConfig.scaleMap[`show_${CurrentChainStorage.chainId}`] || assetConfig.scaleMap['show'];
            let primitive=assetConfig.scaleMap[`primitive_${CurrentChainStorage.chainId}`] || assetConfig.scaleMap['primitive'];

            scaleMap[assetName]={
                show: show,
                primitive: primitive
            };
        }

        return scaleMap;
    },
    assets:[
        {
            name: 'USDT',
            scaleMap: {
                show:'0.000001',
                primitive:'1000000',
                show_56:'0.000000000000000001',
                primitive_56:'1000000000000000000',
            }
        },
        {
            name: 'BTCB',
            scaleMap: {
                show:'0.00000001',
                primitive:'100000000',
                show_56:'0.000000000000000001',
                primitive_56:'1000000000000000000',
            }
        },
        {
            name: 'ETH',
            scaleMap: {
                show:'0.000000000000000001',
                primitive:'1000000000000000000'
            }
        },
        {
            name: 'BNB',
            scaleMap: {
                show:'0.000000000000000001',
                primitive:'1000000000000000000'
            }
        },
        {
            name: 'OPA',
            scaleMap: {
                show:'0.000000000000000001',
                primitive:'1000000000000000000'
            }
        },

    //    OPA staking
        {
            name: 'TEST_ASSET',
            scaleMap: {
                show:'0.000000000000000001',
                primitive:'1000000000000000000'
            }
        },
        {
            name: 'OPA-USDT@Pancake',
            scaleMap: {
                show:'0.000000000000000001',
                primitive:'1000000000000000000'
            }
        },
    ],
    coins: [
        {
            name: 'BTCB',
            icon: 'icon_btc',
        },
        {
            name: 'ETH',
            icon: 'icon_eth',
        },
        {
            name: 'BNB',
            icon: 'icon_bnb',
        },
    ],
    nativeAsset:{
        56:'BNB',
        1:'ETH',
        getNativeAsset: function () {
            return this[`${CurrentChainStorage.chainId}`];
        }
    },
    approve:{
        Buy: [
            {
                contractDes: 'Buy_ETHCallOptionPool',
                address_56: ContractAddressConfig.net56.pool.ETH.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Buy_ETHPutOptionPool',
                address_56: ContractAddressConfig.net56.pool.ETH.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Buy_WBTCCallOptionPool',
                address_56: ContractAddressConfig.net56.pool.BTCB.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Buy_WBTCPutOptionPool',
                address_56: ContractAddressConfig.net56.pool.BTCB.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Buy_BNBCallOptionPool',
                address_56: ContractAddressConfig.net56.pool.BNB.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Buy_BNBPutOptionPool',
                address_56: ContractAddressConfig.net56.pool.BNB.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
        ],
        Sell: [
            {
                contractDes: 'Sell_BNBPutOptionPool',
                address_56: ContractAddressConfig.net56.pool.BNB.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Sell_ETHCallOptionPool',
                address_56: ContractAddressConfig.net56.pool.ETH.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'ETH',
            },
            {
                contractDes: 'Sell_ETHPutOptionPool',
                address_56: ContractAddressConfig.net56.pool.ETH.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
            {
                contractDes: 'Sell_WBTCCallOptionPool',
                address_56: ContractAddressConfig.net56.pool.BTCB.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'BTCB',
            },
            {
                contractDes: 'Sell_WBTCPutOptionPool',
                address_56: ContractAddressConfig.net56.pool.BTCB.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'USDT',
            },
        ],
        OPA:[
            {
                contractDes: 'OPA_DAO',
                address_56: ContractAddressConfig.net56.opa.staking.DAO.stake,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'OPA',
            },
            {
                contractDes: 'OPA_Stake_OPA-USDT@Pancake',
                address_56: ContractAddressConfig.net56.opa.staking['OPA-USDT@Pancake'].stake,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                assetType:'OPA-USDT@Pancake',
            }
        ]
    },
    LP:{
        Pancake:{
            router:{
                name: 'PancakeRouter',
                address_56: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: DEXRouter_Pancake_abi,
            },
            factory:{
                name: 'PancakeFactory',
                address_56: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: DEXFactory_Pancake_abi,
            },
            LP_Token:{
                name: 'PancakePair',
                abi: DEXTokenPair_Pancake_abi,
            },
        },
    },
    contractConfig: {
        USDT: {
            hotPotToken: {
                name: 'HotPotToken',
                address_56: '0x55d398326f99059fF775485246999027B3197955',
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: USDT,
            },
        },
        BTCB: {
            hotPotToken: {
                name: 'BEP20Token',
                address_56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: WBTC,
            },
            callPoolContract: {
                name: 'ERC20CallOptionPool',
                address_56: ContractAddressConfig.net56.pool.BTCB.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: WBTCCallOptionPool,
                depositMethod: 'depositAsset',
                withdrawMethod: 'withdrawAsset',
                poolerToken:{
                    name: 'PoolerToken',
                    abi: WBTCCallPoolerToken,
                }
            },
            putPoolContract: {
                name: 'PutOptionPool',
                address_56: ContractAddressConfig.net56.pool.BTCB.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: WBTCPutOptionPool,
                depositMethod: 'depositUSDT',
                withdrawMethod: 'withdrawUSDT',
                poolerToken:{
                    name: 'PoolerToken',
                    abi: WBTCPutPoolerToken,
                }
            },
            optionContract: {
                name: 'Option',
                abi: Option,
            },
        },
        ETH: {
            hotPotToken: {
                name: 'BEP20Ethereum',
                address_56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: ETH,
            },
            callPoolContract: {
                name: 'ERC20CallOptionPool',
                address_56: ContractAddressConfig.net56.pool.ETH.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: ETHCallOptionPool,
                depositMethod: 'depositAsset',
                withdrawMethod: 'withdrawAsset',
                poolerToken:{
                    name: 'PoolerToken',
                    abi: ETHCallPoolerToken,
                }
            },
            putPoolContract: {
                name: 'PutOptionPool',
                address_56: ContractAddressConfig.net56.pool.ETH.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: ETHPutOptionPool,
                depositMethod: 'depositUSDT',
                withdrawMethod: 'withdrawUSDT',
                poolerToken:{
                    name: 'PoolerToken',
                    abi: ETHPutPoolerToken,
                }
            },
            optionContract: {
                name: 'Option',
                abi: Option,
            },
        },
        BNB: {
            hotPotToken: {
                name: 'WBNB',
                address_56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: BNB_abi,
            },
            callPoolContract: {
                name: 'NativeCallOptionPool',
                address_56: ContractAddressConfig.net56.pool.BNB.call,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: BNBCallOptionPool,
                depositMethod: 'deposit',
                withdrawMethod: 'withdraw',
                poolerToken:{
                    name: 'PoolerToken',
                    abi: BNBCallPoolerToken,
                }
            },
            putPoolContract: {
                name: 'PutOptionPool',
                address_56: ContractAddressConfig.net56.pool.BNB.put,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: BNBPutOptionPool,
                depositMethod: 'depositUSDT',
                withdrawMethod: 'withdrawUSDT',
                poolerToken:{
                    name: 'PoolerToken',
                    abi: BNBPutPoolerToken,
                }
            },
            optionContract: {
                name: 'Option',
                abi: Option,
            },
        },
        OPA: {
            hotPotToken: {
                name: 'OPAToken',
                address_56: ContractAddressConfig.net56.opa.token,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: OPA,
            },
            staking: {
                name: 'Staking',
                abi: Staking,
                address_56_config: ContractAddressConfig.net56.opa,
                address: function (stakeType) {
                    return this[`address_${CurrentChainStorage.chainId}_config`]['staking'][stakeType]['stake'];
                }
            }
        },

    //    OPA Staking
        TEST_ASSET:{
            hotPotToken: {
                name: 'HotPotToken',
                address_56: "0xc2c8804451737ed63db01c092dd7699e0f72f1a4",
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: TEST_ASSET,
            },
        },
        'OPA-USDT@Pancake':{
            hotPotToken: {
                name: 'HotPotToken',
                address_56: ContractAddressConfig.net56.opa.staking['OPA-USDT@Pancake'].asset,
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: DEXTokenPair_Pancake_abi,
            },
        },
    //    LP Price test
        ADA:{
            hotPotToken: {
                name: 'BEP20Cardano',
                address_56: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
                address: function(){
                    return this[`address_${CurrentChainStorage.chainId}`];
                },
                abi: ADA_abi,
            },
        },
    },
};

export default OptionTradingConfig;
