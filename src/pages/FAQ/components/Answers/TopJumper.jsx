import React, { useEffect, useState } from 'react';

import './index.scss';

/**
 * create a throttle callback
 * @param callback
 * @param delay
 * @param thisArg
 */
export const createThrottle = (callback, delay,thisArg) =>{
    let lastInvokeTime = Date.now();
    const _delay = Number(delay) || 200;
    return (...args)=>{
        const now = Date.now();
        if (now - _delay <= lastInvokeTime) {
            return;
        }
        lastInvokeTime = now;
        callback.call(thisArg, ...args)
    }
};

const TopJumper = () =>{
    const [show, switchShow] = useState(false);
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const height=document.getElementById("J_FAQ_title_container").offsetHeight || 300;
            const shouldShow = window.scrollY > height;
            if (shouldShow !== show) {
                switchShow(shouldShow)
            }
        }, 500);
        document.addEventListener('scroll', listener);
        return ()=>document.removeEventListener('scroll', listener);
    }, [show]);

    return show ? (<a className={'to_top'} href={'#QA_Top'}></a>) : null;
};

export default TopJumper;
