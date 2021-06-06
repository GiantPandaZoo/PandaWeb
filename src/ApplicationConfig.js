const ApplicationConfig = {
    lang: 'en-US',
    // lang: 'zh-CN',
    dataRefreshCycle: 13000,
    opaCircSupply: 200000000000000000000000000,
    opaMiningStartTime: '2021-05-31T10:00:00.000Z',
    opaParadropStartTime: '2021-05-31T12:00:00.000Z',
    opaOutputDay:288000,
    LPStakingConfig: [
        // {
        //     dexName:'DoDo',
        //     tokenPair:[
        //         {
        //             name:'OPA-USDT',
        //             token:['OPA','USDT'],
        //             plUrl:'https://ht.mdex.com/#/add/HT',
        //         },
        //         {
        //             name:'OPA-BNB',
        //             token:['OPA','BNB'],
        //             plUrl:'https://ht.mdex.com/#/add/HT',
        //         }
        //     ]
        // },
        {
            dexName:'Pancake',
            tokenPair:[
                {
                    name:'OPA-USDT',
                    token:['OPA','USDT'],
                    assetName:'OPA-USDT@Pancake',
                    plUrl:'https://exchange.pancakeswap.finance/#/add/0xA2F89a3be1bAda5Eb9D58D23EDc2E2FE0F82F4b0/0x55d398326f99059fF775485246999027B3197955',
                },
                // {
                //     name:'OPA-BNB',
                //     token:['OPA','BNB'],
                //     plUrl:'https://ht.mdex.com/#/add/HT',
                // }
            ]
        }
    ],
    poolerAdditionalChargeFee: 0.05
};

export default ApplicationConfig;
