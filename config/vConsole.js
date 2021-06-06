// https://github.com/diamont1001/vconsole-webpack-plugin

const vConsole = (VCONSOLE = 'false') => (config) => {
    if (VCONSOLE === 'false') {
        return config;
    }

    const VConsolePlugin = require('vconsole-webpack-plugin');
    const {checkCLIOptions} = require('./utils');

    config.plugins.push(new VConsolePlugin({enable: VCONSOLE === 'true' || checkCLIOptions('--debug')}));

    console.log('--- enable vConsole ---');
    return config;
};

module.exports = vConsole;
