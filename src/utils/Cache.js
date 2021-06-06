let caches = {};

export default class Cache {
    setCache(actionName, key, value) {
        if (!caches[actionName]) caches[actionName] = {};
        caches[actionName][key] = value;
    }

    getCache(actionName, key) {
        const cache = caches[actionName];
        return cache && key !== undefined ? cache[key] : cache;
    }

    clearCache(actionName) {
        caches[actionName] = undefined;
    }
}
