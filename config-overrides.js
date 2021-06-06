// Migrating from create-react-app without ejecting

// https://github.com/timarney/react-app-rewired/
// https://github.com/arackaf/customize-cra
const {
    override,
    addBabelPlugin,
    addBabelPlugins,
    addBundleVisualizer,
    addDecoratorsLegacy,
    addWebpackAlias,
    addWebpackExternals,
    adjustWorkbox,
    addPostcssPlugins,
    disableEsLint,
    enableEslintTypescript,
    fixBabelImports,
    useEslintRc,
    useBabelRc,
    setWebpackOptimizationSplitChunks,
} = require('customize-cra');

const {
    buildFriendly,
    speedMeasure,
    prerender,
    rewireReactHotLoader,
    vConsole,
    getWebpackAlias,
    extractVendors,
    vendorConfig,
    addStylelint,
    minimizer,
    dropConsole,
    namedOptimize,
    optimizeLodash,
    optimizeMoment,
    rewireThemeIce,
    rewireThemeFusion,
} = require('./config');

const pkgJSON = require(`${__dirname}/package.json`);

// https://github.com/postcss/postcss
const postcssPlugins = [
    require('css-mqpacker')(),
    // px2rem
    // require('postcss-px2rem')({ remUnit: 37.5 }),
];

const {BUNDLE_VISUALIZE, STYLELINT, VCONSOLE, DROP_CONSOLE} = process.env;
console.log('current env：', process.env.NODE_ENV);

module.exports = override(
    vConsole(VCONSOLE),
    rewireThemeIce(pkgJSON),
    rewireThemeFusion(pkgJSON),
    buildFriendly(),
    addWebpackAlias(getWebpackAlias(pkgJSON)),
    addPostcssPlugins(postcssPlugins),
    addStylelint(STYLELINT),
    setWebpackOptimizationSplitChunks(vendorConfig),
    // addWebpackExternals({
    //     react: 'React',
    //     'react-dom': 'ReactDom',
    // }),
    // extractVendors(),
    useEslintRc(),
    useBabelRc(),
    namedOptimize(),
    optimizeLodash(),
    optimizeMoment(),
    minimizer({
        drop_console: DROP_CONSOLE,
    }),
    // speedMeasure(),
    (process.env.NODE_ENV === 'production' || BUNDLE_VISUALIZE === 'true') && addBundleVisualizer()
    // prerender(),
);
