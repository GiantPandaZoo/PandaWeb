function getWebpackAlias(pkgJSON) {
    const resolve = require('./paths');
    const getTheme = require('./getTheme');
    const themeObj = getTheme(pkgJSON);
    let theme = '@alifd/theme-toxic';

    if (themeObj && themeObj.alifd) {
        theme = themeObj.alifd;
    }

    // webpack alias
    /* eslint-disable no-useless-computed-key */
    return {
        ['@']: resolve('src'),
        ['@api']: resolve('src/api'),
        ['@assets']: resolve('src/assets'),
        ['@components']: resolve('src/components'),
        ['@layouts']: resolve('src/layouts'),
        ['@modules']: resolve('src/modules'),
        ['@pages']: resolve('src/pages'),
        ['@routes']: resolve('src/routes'),
        ['@stores']: resolve('src/stores'),
        ['@mock']: resolve('src/mock'),
        ['@utils']: resolve('src/utils'),
        ['@settings']: resolve('src/settings.scss'),
        ['@routerConfig']: resolve('src/routerConfig.js'),
        ['@style']: resolve('style'),
        ['@reset']: resolve('style/_reset.scss'),
        ['@theme']: resolve(`node_modules/${theme}`),
        ['lodash-es']: 'lodash',
    };
}

module.exports = getWebpackAlias;
