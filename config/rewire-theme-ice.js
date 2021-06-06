const rewireThemeIce = (pkgJSON, modifyVars) => (config) => {
    const getTheme = require('./getTheme');
    let theme = getTheme(pkgJSON);

    if (theme && theme.ice) {
        // https://github.com/alibaba/ice/tree/master/tools/webpack-plugin-import
        const WebpackPluginImport = require('webpack-plugin-import');

        config.plugins.push(
            new WebpackPluginImport([
                {
                    libraryName: new RegExp(`${theme.ice.split('/')[0]}\/.*`),
                },
            ])
        );
    }

    return config;
};

module.exports = rewireThemeIce;
