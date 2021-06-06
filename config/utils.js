function checkCLIOptions(flag) {
    if (process.argv.includes(flag)) {
        return true;
    }
    return false;
}

module.exports = {
    checkCLIOptions,
};
