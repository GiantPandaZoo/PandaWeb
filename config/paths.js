const path = require('path');
// const paths = require('react-app-rewired/scripts/utils/paths');

const resolve = (str) => {
    //return path.join(paths.appPath, str);
    return path.resolve(__dirname, '../', str);
};

module.exports = resolve;
