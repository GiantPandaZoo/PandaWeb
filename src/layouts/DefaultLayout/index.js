import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import routerData from '@/routerConfig';
import {loadWeb3} from '@/components/Web3';

import { WalletProvider } from 'react-binance-wallet'

import './index.scss';
import '../../components/Theme/Panda/panda.scss';

export default class UserLayout extends Component {
    componentDidMount() {
        window.addEventListener('load', loadWeb3);
    }

    componentWillUnmount() {
        window.removeEventListener('load', loadWeb3);
    }

    render() {
        return (
            <WalletProvider chainIds={[56]}>
                <div className="main_container panda">
                    <Header/>
                    <Switch>
                        {routerData.map((item, index) => {
                            const {path, component, exact} = item;

                            return component ? (
                                <Route
                                    key={path}
                                    path={path}
                                    component={component}
                                    exact={exact}
                                    render={(props) => {
                                        return <Component {...props} />;
                                    }}
                                />
                            ) : null;
                        })}
                    </Switch>
                    <Footer/>
                </div>
            </WalletProvider>
        );
    }
}
