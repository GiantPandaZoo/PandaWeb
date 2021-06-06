import {autorun} from 'mobx';

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function persistItem(store, name, inSessionStorage = false, global = false) {
    const storage = inSessionStorage ? window.sessionStorage : window.localStorage;
    const keyName = global ? `${name}` : `${store.constructor.name}_${name}`;
    const persistedData = storage.getItem(keyName);

    if (persistedData !== null) {
        try {
            if ('undefined' === typeof persistedData) {
                store[name] = undefined;
            } else {
                const tData = JSON.parse(persistedData);

                if (['object', 'boolean'].includes(typeof tData)) {
                    store[name] = tData;
                } else {
                    store[name] = persistedData;
                }
            }
        } catch (error) {
            store[name] = persistedData;
        }
    }

    autorun(() => {
        let data = store[name];
        if (typeof data !== 'undefined' && typeof data !== 'function' && data !== null) {
            storage.setItem(keyName, typeof data !== 'string' ? JSON.stringify(data) : data);
        } else {
            storage.removeItem(keyName);
        }
    });
}

export function persistParam(store, keyNames, inSessionStorage = false, global = false) {
    if (!storageAvailable('localStorage') || !storageAvailable('sessionStorage')) {
        throw Error('not support');
    }
    if (!keyNames) {
        return;
    }
    if (typeof keyNames === 'string') {
        persistItem(store, keyNames, inSessionStorage, global);
    } else {
        keyNames.forEach((keyName) => persistItem(store, keyName, inSessionStorage, global));
    }
}
