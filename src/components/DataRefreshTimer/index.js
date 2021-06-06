import React, { Component } from 'react';
import log from '../Log';
import {action, observable} from "mobx";
import ApplicationConfig from '../../ApplicationConfig';

class DataRefreshTimer extends Component {
    @observable round = 0;

    constructor(props) {
        super(props);
        this.timerSetup();
    }

    @action
    timerRun(){
        this.round++;
        log.debug(`Data refresh... ,round ${this.round}`);
    }

    timerSetup(){
        setInterval(() => this.timerRun(), ApplicationConfig.dataRefreshCycle);
    }
}

export default new DataRefreshTimer()
