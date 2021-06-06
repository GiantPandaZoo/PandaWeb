import {action, observable} from 'mobx';
import log from "../../../../components/Log";
import BigNumberConvert from "../../../../components/BigNumberConvert";

class MyOptionContractsVO {
    callOptionType="callPoolContract";
    putOptionType="putPoolContract";

    @observable dataArr = [];
    @observable dataArrTemp = [];
    @observable loadDataLength = 0;
    @observable loadedDataLength = 0;
    isLoading = false;

    constructor(){
    }

    @action
    reset(){
        this.currentPrice = 0;
        this.dataArrTemp = [];
        this.loadDataLength=0;
        this.loadedDataLength=0;
        this.isLoading=true;
    }

    @action
    addData(data){
        this.dataArrTemp.push(data);

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

            let arrTemp=this.dataArrTemp.sort((option1,option2)=>{
                let flag1=`${option1.coinName}_${option1.poolType}_${option1.durationShow.padStart(10,'0')}`;
                let flag2=`${option2.coinName}_${option2.poolType}_${option2.durationShow.padStart(10,'0')}`;
                return flag2 > flag1 ? -1 : 1;
            });

            this.dataArr=arrTemp;
        }
    }

    @action
    setLoading(isLoading){
        this.isLoading=isLoading;
    }

    @action
    refreshExpiryDate(){
        let arr=this.dataArr;
        this.dataArr=[];
        for(let data of arr){
            data.refreshExpiryDate();
        }
        this.dataArr=arr;
    }
}

export default new MyOptionContractsVO();
