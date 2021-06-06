import {cloneDeep} from 'lodash-es';

export function assembleFormConfig(src = [], ext = []) {
    if (ext.length === 0) {
        return src;
    }
    const tData = cloneDeep(src);
    ext.forEach((item) => {
        const tId = item.key;
        const tIndex = tData.findIndex((it) => {
            return it.key === tId;
        });
        const {key, ...rest} = item;
        Object.assign(tData[tIndex], rest);
    });

    return tData;
}
