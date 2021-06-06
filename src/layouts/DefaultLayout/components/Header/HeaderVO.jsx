import {action, observable} from 'mobx';
import intl from 'react-intl-universal';

class HeaderVO {
    @observable currentNavKey = 'buy';

    @observable navArr = [
        {
            key:'buy',
            url:'/#BUY',
            nav: intl.get('commons.header.buyer'),
            className:'nav_link'
        },
        {
            key:'sell',
            url:'sell',
            nav: intl.get('commons.header.pooler'),
            className:'nav_link'
        },
        {
            key:'analytics',
            url:'analytics',
            nav: intl.get('commons.header.analytics'),
            className:'nav_link'
        },
        {
            key:'opa',
            url:'OPA',
            nav: intl.get('commons.header.opa'),
            className:'nav_link'
        },
        {
            key:'faq',
            url:'FAQ',
            nav: intl.get('commons.header.faq'),
            className:'nav_link'
        }
    ];

    constructor(){
    }

    @action
    setCurrentNavKey(currentNavKey){
        this.currentNavKey = currentNavKey;

        for(let navItem of this.navArr){
            if(navItem.key==currentNavKey){
                navItem.className='nav_link active';
            }else{
                navItem.className='nav_link';
            }
        }
    }

    @action
    setNavArr(navArr){
        this.navArr=navArr;
    }
}

export default new HeaderVO();
