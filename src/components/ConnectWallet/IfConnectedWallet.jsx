import {observer} from "mobx-react";
import {Component} from "react";
import currentAccountStorage from "../Web3/CurrentAccountStorage";

@observer
class IfConnectedWallet extends Component {
    render() {
        if (currentAccountStorage.account) {
            return this.props.children;
        } else {
            return '';
        }
    }
}

export default IfConnectedWallet;
