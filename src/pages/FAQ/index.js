import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Questions from './components/Questions';
import Answer from "./components/Answers";
import HeaderVO from "../../layouts/DefaultLayout/components/Header/HeaderVO";

@withRouter
class FAQ extends Component {
    componentDidMount(){
        HeaderVO.setCurrentNavKey('faq');
    }

    render() {
        return (
            <div className="sections">
                <Questions/>
                <Answer/>
            </div>
        );
    }
}

export default FAQ;
