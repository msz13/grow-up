import { prop, instanceMethod } from "typegoose";
import { differenceInCalendarDays, eachDay, addDays } from "date-fns";
import { Column, ObjectIdColumn, BeforeInsert } from "typeorm";
import { ObjectID } from "mongodb";
import { LocalDate } from "js-joda";
import {Node} from '../../common/databaseUtil/baseClasses'
import {DateStr} from '../../common/types'

export class GoalDayPerf extends Node {
    constructor (date: DateStr, perfCount?: number){
        super()   
        this.date= date;
                        
     }

        
    @Column()
    date?: DateStr
    @Column()
    perfCount: number = 0;
    @Column()
    targetIsDone: boolean = false;

          
}


export  abstract class GoalPerf extends Node {

    constructor (startActive: LocalDate, overallPerf?: number) {
      super()
      this.startActive= startActive.toString();
       }
 
     @Column()
     startActive?: DateStr;
           
     
     @Column()
     overallPerf?: number = 0;
 
     @Column()
     goalPerfEffectivenes?: number = 0;
       
 
 }
 
 export class ActiveGoalPerf extends GoalPerf{
     
    constructor (startActive: LocalDate){
        super(startActive);
        this.goalDaysPerf=this.createGoalDayPerfList(startActive);       
        }

           
     @Column()
     goalDaysPerf?: GoalDayPerf[];

     needsToUpdateGoalPerf(actualDate: DateStr){
       return (this.getLastDayPerf().date<actualDate)? true: false
      
     }
       
     getLastDayPerf() {
       return this.goalDaysPerf[this.goalDaysPerf.length-1]
     }
    
     createGoalDayPerfList (from?: LocalDate) {
       const  startDate = (from)? from : LocalDate.parse(this.getLastDayPerf().date).plusDays(1)
       const daysGoalPerf: GoalDayPerf[]=[]

       for (let i = 0; i <8; i++) {
         let day = startDate.plusDays(i).toString();
         daysGoalPerf.push(new GoalDayPerf(day, 0))      
        }

       return daysGoalPerf
     }

    updatePerf(value: number, target: number) {
      this.goalDaysPerf[0].perfCount=value;
      const dayPerf = this.goalDaysPerf[0]

      if ((dayPerf.perfCount>=target)&&!dayPerf.targetIsDone) {
        this.goalPerfEffectivenes++
        this.goalDaysPerf[0].targetIsDone=true
        }

      else if ((dayPerf.perfCount<target)&&dayPerf.targetIsDone) {
        this.goalPerfEffectivenes--
        this.goalDaysPerf[0].targetIsDone=false
        }
    }

 }
 
 export class GoalPerfHistory extends GoalPerf {

     constructor ({endActive, dayCount, weekCount, startActive}){
           super(startActive)
     }
     @Column()
     endActive: DateStr;
 
     @Column()
     dayCount: number;
 
     @Column()
     weekCount: number;
 
 }
 
 