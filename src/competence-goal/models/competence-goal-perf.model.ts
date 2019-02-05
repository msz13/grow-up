import { prop, instanceMethod } from "typegoose";
import { differenceInCalendarDays, eachDay, addDays } from "date-fns";

export class GoalDayPerf {
    constructor (date: Date, perfCount?: number){
        this.date= date;
        if (perfCount) {this.setProperties(perfCount)}              
     }
    date: Date
    perfCount: number = null;
    targetIsDone: boolean = null;

    setProperties(perfCount: number) {
        this.perfCount=perfCount;
        this.targetIsDone=false;
    }
}


export  class GoalPerf  {

    constructor (startActive: Date, overallPerf?: number) {
       this.startActive= startActive;
       }
 
     @prop()
     startActive: Date;
           
     
     @prop({default: 0})
     overallPerf: number = 0;
 
     @prop({default: 0})
     goalPerfEffectivenes: number = 0;
       
 
 }
 
 export class ActiveGoalPerf extends GoalPerf{
     
    constructor (startActive: Date){
        super(startActive);
        this.createGoalDayPerfList(startActive);       
        this._whenToAddDayPerf=addDays(startActive,7);
    }

         
     @prop()
     private _whenToAddDayPerf: Date;

     @prop()
     goalDayPerf: GoalDayPerf[];
 
     dayCount(day: Date) {
         return differenceInCalendarDays(new Date(day), this.startActive)+2;
     }
     
     @instanceMethod
     weekCount(day) {
 
         return Math.ceil(this.dayCount(day)/7);
     }

     createGoalDayPerfList (startActive: Date) {
        const dates = eachDay(startActive, addDays(startActive, 7))
        const goalDayPerf =  dates.map((date: Date)=>{
           return new GoalDayPerf(date, 0);
           })
        this.goalDayPerf=goalDayPerf;
     }
 }
 
 export class GoalPerfHistory extends GoalPerf {
     @prop()
     endActive: Date;
 
     @prop()
     dayCount: number;
 
     @prop()
     weekCount: number;
 
 }
 
 