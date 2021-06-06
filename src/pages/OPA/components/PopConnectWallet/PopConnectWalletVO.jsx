import {action, observable} from 'mobx';

class PopConnectWalletVO {
    @observable show = false;

    @action
    setShow(show){
        this.show=show;
    }
}

export default new PopConnectWalletVO();
