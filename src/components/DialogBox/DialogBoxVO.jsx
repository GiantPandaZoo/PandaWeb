import {action, observable} from 'mobx';
import intl from 'react-intl-universal';

class DialogBoxVO {
    @observable visible=false;
    @observable titleIcon="";
    @observable title="";
    @observable content="";
    @observable dialogType="CONFIRM";

    DialogConfig={};

    constructor(){
    }

    configInit(){
        this.DialogConfig={
            CONFIRM:{
                titleIcon:'',
                title:intl.get('commons.dialog.confirm.title'),
                content:intl.get('commons.dialog.confirm.content')
            },
            SUCCESS:{
                titleIcon:'title_icon title_icon_success',
                title:intl.get('commons.dialog.success.title'),
                content:intl.get('commons.dialog.success.content')
            },
            FAILED:{
                titleIcon:'title_icon title_icon_failed',
                title:intl.get('commons.dialog.failed.title'),
                content:intl.get('commons.dialog.failed.content')
            },
        }
    }

    @action
    confirm(){
        this.setDialogType('CONFIRM');
        this.setVisible(true);
    }

    @action
    success(){
        this.setDialogType('SUCCESS');
        this.setVisible(true);
    }

    @action
    failed(){
        this.setDialogType('FAILED');
        this.setVisible(true);
    }

    @action
    setVisible(visible) {
        this.visible = visible;
    }

    @action
    setTitleIcon(titleIcon) {
        this.titleIcon = titleIcon;
    }

    @action
    setTitle(title) {
        this.title = title;
    }

    @action
    setContent(content) {
        this.content = content;
    }

    @action
    setDialogType(dialogType) {
        this.dialogType = dialogType;
        this.setTitle(this.DialogConfig[dialogType].title);
        this.setTitleIcon(this.DialogConfig[dialogType].titleIcon);
        this.setContent(this.DialogConfig[dialogType].content);
    }
}

export default new DialogBoxVO();
