import {Entity, ObjectIdColumn, Column, Index} from 'typeorm';
import {ObjectID} from 'mongodb'
import { GoalPerf } from './competence-goal-perf.model';

export enum GoalStatus {
    ACTIVE = "ACTIVE",
    DONE = "DONE",
    HOLD = "HOLD"
}

const Document = Entity


export abstract class CompetenceGoal  {

    constructor (name?: string, status?: GoalStatus, target?: number, competence?: string,) {
        this.name=name
        this.competence=competence
        this.target=target
        this.status=status
    }

    @ObjectIdColumn()
    id?: ObjectID;

       
    @Column()
    name: string;

    @Column()
    @Index()
    competence?: string;

    @Column()
    target: number=1;

    @Column({type: "enum",
     enum: GoalStatus})
     status: GoalStatus;
   
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




