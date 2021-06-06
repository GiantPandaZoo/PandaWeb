import {each, upperFirst, difference, isEmpty} from 'lodash-es';

export function diffFlatArray(newValue = [], oldValue = []) {
    if (!newValue.length) {
        return {
            adds: [],
            dels: oldValue,
        };
    }
    const tNew = difference(newValue, oldValue); //
    return {
        adds: tNew,
        dels: difference(oldValue, difference(newValue, tNew)), //
    };
}

export function initObjValue(obj) {
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] && Array.isArray(obj[key].slice())) {
            result[key] = [];
        } else {
            result[key] = '';
        }
        return result;
    }, {});
}

export function findDeepByKey(data, {key, value}, seed) {
    const result = [];

    function tFindDeepByKey(dataT, checkKey) {
        for (let i = 0; i < dataT.length; i++) {
            const item = dataT[i];
            const tValue = item[key];
            const tData = item[seed];

            if (tValue === checkKey || (typeof tValue === 'object' && tValue[checkKey])) {
                result.push(item);

                // eslint-disable-next-line no-continue
                continue;
            }
            if (!isEmpty(tData)) {
                tFindDeepByKey(tData, checkKey);
            }
        }
    }

    value.forEach((val) => {
        tFindDeepByKey(data, val);
    });

    return result;
}

export function findLeafForMap(arr = [], seed = 'data') {
    let tArr = [];
    (function tFindData(arr) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (Object.prototype.hasOwnProperty.call(item, seed)) {
                tFindData(item[seed]);
            } else {
                tArr.push(item);
            }
        }
    })(arr);
    return tArr;
}

export function getValuesForMap(data = [], key = 'id') {
    if (isEmpty(data) || data === null) {
        return [];
    }
    return data.map((item) => {
        return item[key];
    });
}

export function assembleData(
    arr = [],
    keysMap = {id: 'key', name: 'label', data: 'children'},
    options = {key: '', value: '', props: {}, seed: 'data'}
) {
    const tMapKeys = Object.keys(keysMap);
    const {key: optKey, value: optValue, props, seed} = options;
    let flag = false;
    let tArr = [];
    return (function tAssembleData(arr) {
        if (arr === null) {
            return [];
        }

        return arr.map((item) => {
            if (optKey && optValue) {
                if (item[optKey] === optValue) {
                    flag = true;
                }
            }

            if (item[optKey] === optValue) {
                (function tMapResult(result) {
                    return result.map((item) => {
                        tArr.push(item[optKey]);
                        const data = item[seed];
                        if (data && data.length) {
                            return tMapResult(data);
                        }
                        return item[optKey];
                    }, []);
                })([item]);
            }

            const tResult = tMapKeys.reduce((result, key) => {
                const tData = item[key];
                if (
                    key === seed &&
                    tData !== null &&
                    typeof tData === 'object' &&
                    Array.isArray(tData) &&
                    tData.length > 0
                ) {
                    result[keysMap[key]] = tAssembleData(tData);
                } else {
                    result[keysMap[key]] = item[key];
                }

                return result;
            }, {});

            flag && tArr.includes(item[optKey]) && Object.assign(tResult, props);

            return tResult;
        });
    })(arr);
}

export function bindKeyForData(data, keysMap = {value: 'key'}) {
    if (data !== null && typeof data === 'object' && Array.isArray(data) && data.length > 0) {
        const tKey = Object.keys(keysMap)[0];
        data.forEach((item) => {
            item[keysMap[tKey]] = item[tKey];
        });
        return data;
    }
}

export function flatObjectMap(prefix = '', mapKeys = [], flatObj = {}) {
    if (mapKeys.length === 0) {
        return;
    }
    let tKeys = Object.keys(flatObj);
    if (tKeys.length === 0) {
        tKeys = mapKeys;
    }
    return tKeys.map((key) => {
        if (mapKeys.includes(key)) {
            return {
                [key]: `${this.prefix}${upperFirst(key)}`,
            };
        } else {
            return {[key]: key};
        }
    });
}

export function flatDataToArr(data = [], seed = 'data') {
    if (isEmpty(data)) {
        return [];
    }
    const result = [];
    (function tFlatData(data) {
        data.forEach((item) => {
            const tArr = item[seed];
            result.push(item);
            if (tArr !== null && !isEmpty(tArr)) {
                tFlatData(tArr);
            }
        });
    })(data);
    return result;
}

export function flatDataToObj(data, key = 'id', seed = 'data') {
    let results = {};
    const mROOT = '0';
    (function tFlatData(data) {
        let r = [];
        data.forEach((item) => {
            r.push(item);
            results[item[key]] = item;
            const tArr = item[seed];
            if (tArr && tArr.length) {
                tFlatData(tArr);
            } else {
                return r;
            }
        });

        if (data[key]) {
            results[data[key]] = r;
        } else {
            results[mROOT] = r;
        }
    })(data);

    return results;
}

export function renameFlatObject(flatObj, prefix = '', renameKeys = []) {
    if (renameKeys.length === 0) {
        return;
    }
    const tKeys = Object.keys(flatObj);
    return tKeys.map((key) => {
        if (renameKeys.includes(key)) {
            return {
                [`${this.prefix}${upperFirst(key)}`]: flatObj[key],
            };
        } else {
            return {[key]: flatObj[key]};
        }
    });
}

export function getGenes(data, id, reverse = false) {
    let genes = [];
    const mROOT = '0';

    if (!isEmpty(data)) {
        (function tGetGenes(data, id) {
            each(data, (value, key) => {
                if (id === key) {
                    genes.push(Number(id));

                    if (id !== mROOT) {
                        tGetGenes(data, value);
                    }
                }
            });
        })(data, id);
    }

    if (reverse) {
        return genes;
    } else {
        return genes.reverse();
    }
}

export function getInitRoleArry(idsArry, dataSource) {
    const newArray = [];
    idsArry.forEach((item) => {
        newArray.push(dataSource.find((it) => it.id === item));
    });
    return newArray;
}

export function getInitArry(data) {
    const newPosArr = [];
    data.forEach((it) => {
        const obj = {};
        obj.id = it.key;
        obj.name = it.label;
        obj.isCheck = it.disabled ? '' : 'Y';
        newPosArr.push(obj);
    });
    return newPosArr;
}

export function initIdsStr(param) {
    if (!param) {
        return;
    }
    const newArry = [];
    param.forEach((item) => {
        newArry.push(item.id);
        if (item.data && item.data.length > 0) {
            initIdsStr(item.data);
        }
    });
    return newArry.join(',');
}
