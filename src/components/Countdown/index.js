import moment from 'moment'

class Countdown {
    endTime=0;
    endTimeFormat=0;
    countdownTime='';
    isOver=false;

    constructor(endTime){
        this.endTime=endTime;
        this.buildCountdownTime();
    }

    buildCountdownTime(){
        let date=new Date(this.endTime * 1000);
        let a = moment(date);
        a.local();

        this.endTimeFormat=a.format('YYYY-MM-DD HH:mm:ss');

        let now=moment();
        let diff=a.diff(now, 'seconds');
        if(diff<=0){
            this.countdownTime = "--";
            this.isOver=true;
        }else{
            this.isOver=false;

            let minDiff=a.diff(now, 'minutes');
            let min='';
            if(minDiff<10){
                min=`0${minDiff}`;
            }else{
                min=minDiff;
            }

            let secDiff=diff % 60;
            let sec='';
            if(secDiff<10){
                sec=`0${secDiff}`;
            }else{
                sec=secDiff;
            }

            this.countdownTime = `${min}:${sec}`;
        }
    }

    refreshCountdownTime(){
        this.buildCountdownTime();
        return this;
    }
}

export default Countdown;
