class Log {
    level = 'info';

    debug(log) {
        if (this.level === 'debug') {
            console.log(log);
        }
    }

    info(log) {
        console.log(log);
    }
}

export default new Log();
