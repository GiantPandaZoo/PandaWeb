const assert = require('assert');
const chalk = require('chalk');

const envCmd = require('./.env-cmdrc.js');

const environments = new Set(Object.keys(envCmd));
const envKeys = new Set([
    'NODE_ENV',
    'REACT_APP_NAME',
    'REACT_APP_TITLE',
    'REACT_APP_VERSION',
    'PUBLIC_URL',
    '|',
    'REACT_APP_HMR',
    'VCONSOLE',
    'GENERATE_SOURCEMAP',
    'EXTEND_ESLINT',
    'STYLELINT',
    'BUNDLE_VISUALIZE',
    '||',
    'REACT_APP_ICONFONT_URL',
]);

environments.forEach((env) => {
    Object.keys(envCmd[env]).forEach((key) => {
        envKeys.add(key);
    });
});

const envArray = process.env.npm_lifecycle_script.split('node')[0].split('-e')[1];

console.log(`==========================================================================`);
console.log(chalk.cyan(`Environment: ${envArray}`));
console.log(`--------------------------------------------------------------------------`);

envKeys.forEach((key) => {
    if (key.indexOf('|') >= 0) {
        console.log(`--------------------------------------------------------------------------`);
    } else {
        console.log(`${key}: ${process.env[key]}`);
    }
});

console.log(`==========================================================================`);

const env = Array.from(environments).indexOf(process.env.NODE_ENV) >= 0;
// eslint-disable-next-line no-bitwise
assert(!!~env);
console.log(chalk.green(`Asserts Pass!`));

console.log(`==========================================================================`);
