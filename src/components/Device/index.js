import log from '../Log';
import d from "current-device";
import {action, observable} from "mobx";

class Device {
    @observable deviceType = "";

    constructor(){
        this.setDeviceType();
    }

    @action
    setDeviceType(){
        if(d.mobile()){
            this.deviceType='phone';
        }

        if(d.tablet()){
            this.deviceType='tablet';
        }

        if(d.desktop()){
            this.deviceType='desktop';
        }

        log.debug(`current device is => ${this.deviceType}`);
    }
}

export default new Device()
