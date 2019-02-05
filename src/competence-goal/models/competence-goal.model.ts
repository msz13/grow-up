import {ObjectId} from 'mongodb';
import {GoalStatus} from '../../common/graphql.schema';
import { prop, Typegoose, ModelType, staticMethod, instanceMethod, InstanceType, arrayProp, post } from 'typegoose';
import {eachDay, endOfMonth, format, startOfMonth, addMonths, differenceInCalendarDays, startOfDay, addDays} from 'date-fns';
import { ActiveGoalPerf, GoalPerf } from './competence-goal-perf.model';




   
    

export class CompetenceGoal extends Typegoose  {
   
    id: string;
   
    @prop()
    name: string;

    @prop()
    competence: string;

    @prop()
    target: number;

    @prop()
    status: GoalStatus;
         
     
    @prop()
    performance?: ActiveGoalPerf;

    @arrayProp({items: GoalPerf})
    perfHistory?: GoalPerf[];

    @staticMethod
    static findActive (this: ModelType<CompetenceGoal> & typeof CompetenceGoal, competence?: String) {
               
      return  this.find()
        .or([{competence: competence}, {status: GoalStatus.ACTIVE}])
        .select('name competence status target startActive performance')
        .exec();          
      
    }
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
   
*/  
    @instanceMethod
    saveActive (this: InstanceType<CompetenceGoal>, startActive:Date) {

        this.status=GoalStatus.ACTIVE;
        
        this.performance= new ActiveGoalPerf(startActive);
        
        console.log(JSON.stringify(this,null,5))
               
        return this.save();    
    }


       
}




