import moment from 'moment';

export function getTodayRange() {
    let date = [];
    date.push(moment().subtract('days', 0).format('YYYY/MM/DD'));
    date.push(moment().subtract('days', 0).format('YYYY/MM/DD'));
    return date;
}

export function getYesterdayRange() {
    let date = [];
    date.push(moment().subtract('days', 1).format('YYYY/MM/DD'));
    date.push(moment().subtract('days', 1).format('YYYY/MM/DD'));
    return date;
}

export function getLast7DaysRange() {
    let date = [];
    date.push(moment().subtract('days', 7).format('YYYY/MM/DD'));
    date.push(moment().subtract('days', 1).format('YYYY/MM/DD'));
    return date;
}

export function getLast30DaysRange() {
    let date = [];
    date.push(moment().subtract('days', 30).format('YYYY/MM/DD'));
    date.push(moment().subtract('days', 1).format('YYYY/MM/DD'));
    return date;
}

export function getLastWeekDaysRange(options = {startDay: 'Monday'}) {
    let date = [];
    let weekOfday = parseInt(moment().format('d'), 10);

    let s1 = options.startDay === 'Monday' ? weekOfday + 7 - 1 : weekOfday + 7;
    let s2 = options.startDay === 'Monday' ? weekOfday : weekOfday + 1;

    let start = moment().subtract(s1, 'days').format('YYYY/MM/DD');
    let end = moment().subtract(s2, 'days').format('YYYY/MM/DD');
    date.push(start);
    date.push(end);
    return date;
}

export function getCurrWeekDaysRange(options = {startDay: 'Monday'}) {
    let date = [];
    let weekOfday = parseInt(moment().format('d'), 10);

    let s1 = options.startDay === 'Monday' ? weekOfday - 1 : weekOfday;
    let s2 = options.startDay === 'Monday' ? 7 - weekOfday : 7 - weekOfday - 1;

    let start = moment().subtract(s1, 'days').format('YYYY/MM/DD');
    let end = moment().add(s2, 'days').format('YYYY/MM/DD');
    date.push(start);
    date.push(end);
    return date;
}

export function getLastMonthDaysRange() {
    let date = [];
    let start = `${moment().subtract('month', 1).format('YYYY/MM')}/01`;
    let end = moment(start).subtract('month', -1).add('days', -1).format('YYYY/MM/DD');
    date.push(start);
    date.push(end);
    return date;
}

export function getCurrMonthDaysRange() {
    let date = [];
    let start = `${moment().add('month', 0).format('YYYY/MM')}/01`;
    let end = moment(start).add('month', 1).add('days', -1).format('YYYY/MM/DD');
    date.push(start);
    date.push(end);
    return date;
}
