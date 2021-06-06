// .env-cmdrc.js
//

module.exports = {
    development: {
        // NODE_ENV: 'development',
        REACT_APP_HMR: true,
        EXTEND_ESLINT: true,
    },
    production: {
        // NODE_ENV: 'production',
        BUNDLE_VISUALIZE: true,
    },
    debug: {
        GENERATE_SOURCEMAP: true, //
        DROP_CONSOLE: false, //
        VCONSOLE: true, //
    },
    test: {},
    uat: {
        PORT: 8080,
    },
};
