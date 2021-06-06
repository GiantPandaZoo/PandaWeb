const speedMeasure = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }

    //https://github.com/stephencookdev/speed-measure-webpack-plugin
    const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
    const smp = new SpeedMeasurePlugin();

    return smp.wrap(config);
};

module.exports = speedMeasure;
