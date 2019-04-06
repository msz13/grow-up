import { differenceInCalendarDays, eachDay, addDays } from "date-fns";
import { Column, ObjectIdColumn, BeforeInsert } from "typeorm";
import { ObjectID } from "mongodb";
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

    constructor (startActive: DateStr, overallPerf?: number) {
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
 
 