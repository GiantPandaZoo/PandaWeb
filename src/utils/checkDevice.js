export const UA = navigator.userAgent.toLowerCase();

export const isWebView = (() => {
    if (UA.indexOf('cordova') >= 0) {
        return true;
    }
    return false;
})();

export const getDeviceType = () => {
    if (UA.indexOf('iphone') !== -1) {
        return 'iphone';
    }
    return 'android';
};

export const getIOSVersion = () => {
    const ver = UA.match(/cpu iphone os (.*?) like mac os/);
    if (ver) {
        const tVer = ver[1].replace(/_/g, '.');

        return tVer;
    } else {
        return '';
    }
};

export const isMicroMessenger = () => {
    const tUA = UA.match(/micromessenger/i);

    if (tUA && tUA.indexOf('micromessenger') > -1) {
        return true;
    } else {
        return false;
    }
};

export const inWxWork = () => {
    return isMicroMessenger() && /wxwork/.test(UA);
};
