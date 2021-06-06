import {action, observable} from 'mobx'

class CurrentChainStorage {
    @observable chainId = 0;

    @action
    setChainId(chainId){
        this.chainId=chainId;
    }
}

export default new CurrentChainStorage()
