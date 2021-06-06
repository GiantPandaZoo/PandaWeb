import {action, observable} from 'mobx'
import log from '../../components/Log';

class CurrentAccountStorage {
    @observable account = "";

    @action
    loadAccountFromWeb3() {
        let updateAccount = this;
        window.web3.eth.getAccounts().then((account) => {
            log.info(`load accounts => ${account}`);

            if (account && account.length) {
                updateAccount.setAccount(account[0]);
            }
        });
    }

    @action
    clearAccount() {
        this.setAccount("");
    }

    @action
    setAccount(currentAccount) {
        if (window.localStorage) {
            this.account = currentAccount;
            let storage = window.localStorage;
            storage.setItem("CURRENT_ACCOUNT", currentAccount);
        }
    }
}

export default new CurrentAccountStorage()
