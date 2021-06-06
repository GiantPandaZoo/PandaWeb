import {action, observable} from 'mobx';

class ListOptionsVO {
    @observable dataArr = [];
    @observable loadDataLength = 0;
    @observable isLoading = true;

    constructor(){
        this.dataArr=[
            {
                asset: 'BTCB',
                pool: 'CALL',
                optionType: 'callPoolContract',
            },
            {
                asset: 'BTCB',
                pool: 'PUT',
                optionType: 'putPoolContract',
            },
            {
                asset: 'ETH',
                pool: 'CALL',
                optionType: 'callPoolContract',
            },
            {
                asset: 'ETH',
                pool: 'PUT',
                optionType: 'putPoolContract',
            },
            {
                asset: 'BNB',
                pool: 'CALL',
                optionType: 'callPoolContract',
            },
            {
                asset: 'BNB',
                pool: 'PUT',
                optionType: 'putPoolContract',
            }
        ];

        this.isLoading=false;
    }

    @action
    reset(){
        this.dataArr = [];
        this.loadDataLength=0;
        this.isLoading=true;
    }

    @action
    addPoolData(data){
        this.dataArr.push(data);

        if(this.dataArr.length == this.loadDataLength){
            this.setLoading(false);
        }
    }

    @action
    addLoadDataLength(length){
        this.loadDataLength=this.loadDataLength+length;
    }

    @action
    setLoading(isLoading){
        this.isLoading=isLoading;
    }

}

export default new ListOptionsVO();
