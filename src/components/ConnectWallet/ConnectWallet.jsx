import '../Theme/theme.scss';

import React, {Component} from 'react';
import currentAccountStorage from '../Web3/CurrentAccountStorage';
import {observer} from 'mobx-react';

import LoadWallet from "./LoadWallet";

@observer
class ConnectWallet extends Component {
    render() {
        if (!currentAccountStorage.account) {
            return (
                <LoadWallet customBtnClass={this.props.customBtnClass||''}/>
            );
        } else {
            if (this.props.showAccount) {
                return (
                    <div className={'account_box'}>
                        <div className={'account'}
                             title={currentAccountStorage.account}>{currentAccountStorage.account}</div>
                        <LoadWallet customDisBtnClass={this.props.customDisBtnClass||''}/>
                    </div>
                );
            } else {
                return "";
            }
        }
    }
}

export default ConnectWallet;
