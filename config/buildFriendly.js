const buildFriendly = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    // https://github.com/hyunchulkwak/webpack-simple-progress-plugin
    const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

    // https://github.com/RoccoC/webpack-build-notifier
    const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

    config.plugins.push(
        new SimpleProgressPlugin(),
        new WebpackBuildNotifierPlugin({
            suppressSuccess: false,
            suppressCompileStart: false,
            suppressWarning: false,
            activateTerminalOnError: true,
        })
    );

    return config;
};

module.exports = buildFriendly;
