import './index.scss';

import React, {Component} from "react";
import { Dialog } from '@alifd/next';
import DialogBoxVO from './DialogBoxVO';
import {observer} from "mobx-react";

@observer
class DialogBox extends Component {
    onOpen = () => {
        DialogBoxVO.setVisible(true);
    };

    onClose = () => {
        DialogBoxVO.setVisible(false);
    };

    componentDidMount(){
        DialogBoxVO.configInit();
    }

    render(){
        return (
            <Dialog
                title=""
                visible={DialogBoxVO.visible}
                footerActions={[]}
                onClose={this.onClose}>
                <div className={'content_title'}><div className={DialogBoxVO.titleIcon}></div>{DialogBoxVO.title}</div>
                <div className={'d_content'}>{DialogBoxVO.content}</div>
            </Dialog>
        );
    }
};

export default DialogBox;
