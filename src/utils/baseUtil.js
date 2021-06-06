import {upperFirst} from 'lodash-es';

export function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

export function addPrefix(str, prefix = 'btn') {
    const arr = upperFirst(str.trim()).split(/\s+/);
    const tResult = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        tResult.push(`${prefix}${arr[i]}`);
    }
    return tResult.join(' ');
}

export function emoji2Str(str) {
    return unescape(escape(str).replace(/%uD.{3}/g, ''));
}

export function escapeHTML(str) {
    if (str.length === 0) return '';
    return `${str}`
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;');
}

export function unescapeHTML(str) {
    if (str.length === 0) return '';
    return `${str}`
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
}
