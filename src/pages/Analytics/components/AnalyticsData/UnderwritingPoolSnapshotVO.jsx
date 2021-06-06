import {action, observable} from 'mobx';

class UnderwritingPoolSnapshotVO {
    @observable poolData = [];
    @observable dataArrTemp = [];
    @observable loadDataLength = 0;
    @observable loadedDataLength = 0;
    isLoading = false;

    constructor(){
    }

    @action
    reset(){
        this.dataArrTemp = [];
        this.loadDataLength=0;
        this.loadedDataLength=0;
        this.isLoading=true;
    }

    @action
    addPoolData(poolData){
        this.dataArrTemp.push(poolData);

        this.addLoadedDataLength(1);
    }

    @action
    addLoadDataLength(length){
        this.loadDataLength=this.loadDataLength+length;
    }

    @action
    addLoadedDataLength(length){
        this.loadedDataLength=this.loadedDataLength+length;

        if(this.loadedDataLength == this.loadDataLength){
            this.setLoading(false);
            this.poolData=this.dataArrTemp;
        }
    }

    @action
    setLoading(isLoading){
        this.isLoading=isLoading;
    }

    @action
    refreshExpiryDate(){
        let arr=this.poolData;
        this.poolData=[];
        for(let data of arr){
            data.setExpiryDate(data.expiryDate);
        }
        this.poolData=arr;
    }
}

export default new UnderwritingPoolSnapshotVO();
