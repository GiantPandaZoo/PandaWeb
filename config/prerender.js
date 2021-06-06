// == PRERENDER SPA PLUGIN == //
const prerender = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    const resolve = require('./paths');
    const PrerenderSPAPlugin = require('prerender-spa-plugin');
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
    config.plugins.push(
        new PrerenderSPAPlugin({
            // Index.html is in the root directory.
            staticDir: resolve('build'),
            routes: ['/', '/list', '/base'],
            outputDir: resolve('build/prerendered'),
            // Optional minification.
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                keepClosingSlash: true,
                sortAttributes: true,
            },

            renderer: new Renderer({
                renderAfterTime: 500,
            }),
        })
    );

    return config;
};

module.exports = prerender;
