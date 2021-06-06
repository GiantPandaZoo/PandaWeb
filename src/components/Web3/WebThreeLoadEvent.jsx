import {action, observable, autorun} from 'mobx'

class WebThreeLoadEvent {
    @observable isLoaded = false;

    listeners = [];

    constructor(){
        autorun(() => {
            if(this.isLoaded && this.listeners.length){
                for (let listener of this.listeners) {
                    listener.call();
                }
            }
        });
    }

    addListener(listener,references) {
        if(references){
            this.listeners.push(()=>{
                listener.call(references);
            });
        }else{
            this.listeners.push(listener);
        }
    }

    @action
    setLoadState(state){
        this.isLoaded=state;
    }

}

export default new WebThreeLoadEvent()
