// Bundle Splitting
// https://webpack.docschina.org/configuration/optimization/#optimization-splitchunks

module.exports = {
    chunks: 'all',
    minSize: 30000, // 30KB
    minChunks: 1,
    maxAsyncRequests: 3,
    maxInitialRequests: 3,
    cacheGroups: {
        vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
        },
        common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
        },
    },
};
