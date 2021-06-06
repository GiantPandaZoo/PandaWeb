import {action, observable} from 'mobx';

class ProfitVO {
    @observable callDataArr = [];
    @observable callDataArrTemp = [];
    @observable callLoadDataLength = 0;
    @observable callLoadedDataLength = 0;

    isCallLoading = false;

    @observable putDataArr = [];
    @observable putDataArrTemp = [];
    @observable putLoadDataLength = 0;
    @observable putLoadedDataLength = 0;

    isPutLoading = false;

    constructor(){
    }

    @action
    reset(){
        this.callDataArrTemp = [];
        this.callLoadDataLength = 0;
        this.callLoadedDataLength = 0;

        this.isCallLoading = true;

        this.putDataArrTemp = [];
        this.putLoadDataLength = 0;
        this.putLoadedDataLength = 0;

        this.isPutLoading=true;
    }

    @action
    addCallData(data){
        this.callDataArrTemp.push(data);
        this.addCallLoadedDataLength(1);
    }

    @action
    addCallLoadDataLength(length){
        this.callLoadDataLength += length;
    }

    @action
    addCallLoadedDataLength(length){
        this.callLoadedDataLength += length;

        if(this.callLoadedDataLength == this.callLoadDataLength){
            this.setCallLoading(false);

            this.callDataArr=this.callDataArrTemp.sort((option1,option2)=>{
                let flag1=`${option1.coinName}`;
                let flag2=`${option2.coinName}`;
                return flag2 > flag1 ? -1 : 1;
            });
        }
    }

    @action
    setCallLoading(isLoading){
        this.isCallLoading=isLoading;
    }

    @action
    addPutData(data){
        this.putDataArrTemp.push(data);
        this.addPutLoadedDataLength(1);
    }

    @action
    addPutLoadDataLength(length){
        this.putLoadDataLength += length;
    }

    @action
    addPutLoadedDataLength(length){
        this.putLoadedDataLength += length;

        if(this.putLoadedDataLength == this.putLoadDataLength){
            this.setPutLoading(false);

            this.putDataArr=this.putDataArrTemp.sort((option1,option2)=>{
                let flag1=`${option1.coinName}`;
                let flag2=`${option2.coinName}`;
                return flag2 > flag1 ? -1 : 1;
            });
        }
    }

    @action
    setPutLoading(isLoading){
        this.isPutLoading=isLoading;
    }
}

export default new ProfitVO();
