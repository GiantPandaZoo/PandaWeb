const rewireThemeFusion = (pkgJSON, modifyVars) => (config) => {
    const getTheme = require('./getTheme');
    let theme = getTheme(pkgJSON);

    if (theme && theme.alifd) {
        // https://github.com/alibaba-fusion/next-theme-webpack-plugin
        const ThemePlugin = require('@alifd/next-theme-webpack-plugin');
        const sassTest = ['.sass', '.module.sass'];
        const checkSass = (reg) => {
            if (!reg || Array.isArray(reg)) {
                return false;
            }

            return !!sassTest.filter((item) => {
                return reg.test(item);
            }).length;
        };
        const sassRules = config.module.rules.filter((item) => {
            return Object.keys(item).includes('oneOf');
        });

        if (sassRules.length) {
            sassRules[0].oneOf.forEach((rule) => {
                const {test} = rule;

                if (checkSass(test)) {
                    rule.use.push({
                        loader: '@alifd/next-theme-loader',
                        options: {
                            theme: theme.alifd,
                        },
                    });
                    // console.log('sass-rule:', rule.use);
                }
            });

            const tObj = {};
            if (modifyVars) {
                tObj.modifyVars = modifyVars;
            }

            config.plugins.push(
                new ThemePlugin({
                    theme: theme.alifd,
                    ...tObj,
                })
            );
        } else {
            // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js
            throw Error('create-react-app build error...');
        }
    }

    return config;
};

module.exports = rewireThemeFusion;
