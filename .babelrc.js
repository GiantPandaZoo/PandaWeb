// .babelrc.js

module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'lodash-es',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'lodash-es',
        ],
        [
            'import',
            {
                libraryName: '@alifd/next',
                libraryDirectory: 'es',
            },
            '@alifd',
        ],
        ['@babel/plugin-proposal-decorators', {legacy: true}],
    ],
    env: {
        development: {
            presets: ['react-app'],
        },
        production: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false, //
                        debug: false, //
                        useBuiltIns: 'usage', //
                        corejs: {version: 3, proposals: true},
                        // targets: {
                        //     android: '6',
                        //     ios: '10',
                        //     edge: '17',
                        //     chrome: '67',
                        // },
                    },
                ],
                'react-app',
            ],
        },
        test: {},
    },
};
