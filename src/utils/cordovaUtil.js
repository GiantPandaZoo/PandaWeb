class CordovaUtil {
    isCordovaApp = false;

    constructor() {
        if (!CordovaUtil.instance) {
            this.isCordovaApp = window.navigator.userAgent.toLocaleLowerCase().indexOf('cordova') >= 0;
            CordovaUtil.instance = this;
        }
        return CordovaUtil.instance;
    }

    listenBackButton(history) {
        this.runInCodova(() => {
            window.document.addEventListener(
                'backbutton',
                () => {
                    const path = history.location.pathname;
                    if (path === '/' || path === '/my' || path === '/category' || path === '/cartindex/footer') {
                        window.navigator.app.exitApp();
                    } else {
                        history.goBack();
                    }
                },
                false
            );
        });
    }

    closeSplashScreen() {
        this.runInCodova(() => {
            window.StatusBar.styleDefault();
            window.navigator.splashscreen.hide();
        });
    }

    runInCodova(fuc) {
        if (window.cordova) {
            fuc();
        } else {
            window.document.addEventListener('deviceready', fuc, false);
        }
    }

    setStatusBarToLight() {
        this.runInCodova(() => {
            window.StatusBar.styleBlackOpaque();
        });
    }

    setStatusBarToBlack() {
        this.runInCodova(() => {
            window.StatusBar.styleDefault();
        });
    }
}

export default new CordovaUtil();
