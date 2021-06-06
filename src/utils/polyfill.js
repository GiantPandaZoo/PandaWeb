/** IE9, IE10 and IE11 requires all of the following polyfills. * */
import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es7/object';
import 'core-js/es7/promise';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/date';
import 'core-js/es6/regexp';
import 'core-js/es6/weak-map';

/** IE10 and IE11 requires the following for the Reflect API. */
import 'core-js/es6/reflect';

/** Evergreen browsers require these. * */
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect';

// Standard now
import 'core-js/fn/array/includes';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/pad-start';
import 'core-js/fn/string/pad-end';
import 'core-js/fn/symbol/async-iterator';
import 'core-js/fn/object/get-own-property-descriptors';
import 'core-js/fn/object/values';
import 'core-js/fn/object/entries';
import 'core-js/fn/promise/finally';

require('raf').polyfill(window);

// CustomEvent() constructor functionality in IE9, IE10, IE11
(function () {
    if (typeof window.CustomEvent === 'function') {
        return false;
    }

    function CustomEvent(event, params) {
        const tParams = params || {bubbles: false, cancelable: false, detail: undefined};
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, tParams.bubbles, tParams.cancelable, tParams.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
