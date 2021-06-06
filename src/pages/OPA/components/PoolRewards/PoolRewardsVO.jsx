import {action, observable} from 'mobx';
import BigNumberConvert from "../../../../components/BigNumberConvert";

class PoolRewardsVO {
    @observable totalRewards = 0;

    @observable dataArr = [];
    @observable dataArrTemp = [];
    @observable loadDataLength = 0;
    @observable loadedDataLength = 0;
    isLoading = false;

    @action
    reset(){
        this.dataArrTemp = [];
        this.loadDataLength=0;
        this.loadedDataLength=0;
        this.isLoading=true;
    }

    @action
    setDataArr(dataArr){
        this.dataArr=dataArr;
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
            this.dataArr=this.dataArrTemp;

            this.countTotalRewards();
        }
    }

    @action
    countTotalRewards(){
        let total=0;
        for (let poolRewardsData of this.dataArr) {
            total+=poolRewardsData.callPoolRewardsShowNumber;
            total+=poolRewardsData.putPoolRewardsShowNumber;
        }
        this.totalRewards=BigNumberConvert.toFormatDecimal(total,4);
    }

    @action
    setLoading(isLoading){
        this.isLoading=isLoading;
    }
}

export default new PoolRewardsVO();
