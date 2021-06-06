import {action, observable} from "mobx";

class CountdownTimer {
    @observable round = 0;

    constructor() {
        this.timerSetup();
    }

    @action
    timerRun(){
        this.round++;
    }

    timerSetup(){
        setInterval(() => this.timerRun(), 1000);
    }
}

export default new CountdownTimer()
