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
  
 export class GoalPerfHistory  {

     constructor (startActive, endActive, dayCount, daysOnTarget){
         this.startActive = startActive
         this.endActive = endActive
         this.dayCount = dayCount
         this.daysOnTarget = daysOnTarget           
     }
    
     @Column()
     startActive: DateStr

     @Column()
     endActive: DateStr;
 
     @Column()
     dayCount: number;
 
     // @Column()
     // weekCount: number;

     @Column()
     daysOnTarget: number;
 
 }
 
 