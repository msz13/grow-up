import {Entity, ObjectIdColumn, Column} from 'typeorm';
import {ObjectID} from 'mongodb'
import { ActiveGoalPerf, GoalPerf } from './competence-goal-perf.model';

export enum GoalStatus {
    ACTIVE = "ACTIVE",
    DONE = "DONE",
    HOLD = "HOLD"
}

const Document = Entity

@Document()
export class CompetenceGoal  {

    @ObjectIdColumn()
    id: ObjectID;
   
    @Column()
    name: string;

    @Column()
    competence?: string;

    @Column()
    target?: number;

    @Column({type: "enum",
     enum: GoalStatus})
     status?: GoalStatus;
      
    @Column(type=>ActiveGoalPerf)
    performance?: ActiveGoalPerf;

    @Column(type=>GoalPerf)
    perfHistory?: GoalPerf[];
/*
    
    //sprawdzić, że zawsze przy robieniu active statusu tworza sie uzuwane pola
    @instanceMethod
    setInActive(dayCount: number, endActive: number, status: GoalStatus) {
        console.log("in active w modelu")
        this.goalPerf.dayCount=dayCount;
        this.goalPerf.endActive=endActive;
        this.perfHistory.push(this.goalPerf);
        this.goalPerf=undefined;        
        this.goalWeekPerf=undefined;
        this.status=status;
                
    }

    @instanceMethod
    isActive():boolean {
        if (this.status=GoalStatus.ACTIVE) {
            return true;
        }

        else return false;
    }
   
*/  /*
    
*/

       
}




