const buildFriendly = require('./buildFriendly');
const speedMeasure = require('./speedMeasure');
const prerender = require('./prerender');
// react-hot-loader
const rewireReactHotLoader = require('./rewireReactHotLoader');
// webpack alias
const getWebpackAlias = require('./aliasConfig');
// const extractVendors = require('./extractVendors');
const vendorConfig = require('./vendorConfig');
const vConsole = require('./vConsole');
const addStylelint = require('./addStyleLint');
const minimizer = require('./minimizer');
const dropConsole = require('./dropConsole');
const namedOptimize = require('./namedOptimize');
const optimizeLodash = require('./optimizeLodash');
const optimizeMoment = require('./optimizeMoment');
const rewireThemeIce = require('./rewire-theme-ice');
const rewireThemeFusion = require('./rewire-theme-fusion');

module.exports = {
    buildFriendly,
    speedMeasure,
    prerender,
    rewireReactHotLoader,
    getWebpackAlias,
    // extractVendors,
    vendorConfig,
    vConsole,
    addStylelint,
    minimizer,
    dropConsole,
    namedOptimize,
    optimizeLodash,
    optimizeMoment,
    rewireThemeIce,
    rewireThemeFusion,
};
