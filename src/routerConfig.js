// src/routerConfig.js

import {Home, Sell, Analytics, OPA, FAQ, OPDashboard} from '@pages';

const routerConfig = [
    {
        path: '/',
        title: 'home',
        component: Home,
        exact: true,
    },
    {
        path: '/home',
        title: 'home',
        component: Home,
    },
    {
        path: '/sell',
        title: 'sell',
        component: Sell,
    },
    {
        path: '/analytics',
        title: 'analytics',
        component: Analytics,
    },
    {
        path: '/OPA',
        title: 'OPA',
        component: OPA,
    },
    {
        path: '/FAQ',
        title: 'FAQ',
        component: FAQ,
    },
    {
        path: '/dashboard.op',
        title: 'dashboard',
        component: OPDashboard,
    },
];

export default routerConfig;
