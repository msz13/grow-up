import { Injectable } from '@nestjs/common';
import { CompetenceGoal} from '../models/competence-goal.model';
import { GoalStatus } from '../../common/graphql.schema';
import { CreateCompetenceGoalInput } from '../DTO/competence-goal-input';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { UpdateCompetenceGoalInput } from '../DTO/competence-goal-update-input';
import format = require('date-fns/format');
import { startOfToday, addDays, eachDay } from 'date-fns';
import { GoalDayPerf, ActiveGoalPerf, GoalPerf } from '../models/competence-goal-perf.model';

//!!! przemysleć sprawę dat, czy bierzemy z argumentów czy z moment, czy moment dajemy do serwisu

@Injectable()
export class CompetenceGoalService {

   
 
   constructor (
     //  @InjectModel (CompetenceGoal) 
     //  private readonly compGoalModel: ModelType<CompetenceGoal>,
      ) {}

      createGoalDayPerfList (startActive: Date) {
         const dates = eachDay(startActive, addDays(startActive, 6))
         return dates.map((date: Date)=>{
            return new GoalDayPerf(date, 0);
            })
      }

      getGoalDayPerf(activeGoalPerf: ActiveGoalPerf, from: Date, to: Date) {
         return activeGoalPerf.goalDayPerf.filter((goalDayPerf: GoalDayPerf)=>{
            return goalDayPerf.date >= from && goalDayPerf.date<= to;

         })
      }
      /*
       
   async findActive(competence: string): Promise<CompetenceGoal[]> {
       
      const compGoals =  await this.compGoalModel.findActive(competence);

      return  compGoals;
    
     }
      
   
   async create(newGoal: CreateCompetenceGoalInput): Promise<CompetenceGoal> {
                
     const createdCompGoal: CompetenceGoal = new this.compGoalModel(newGoal);  
                
     return await createdCompGoal.saveActive(startOfToday());             
   }

   /*
  async incPerf(comGoal_Id: string, fDayOfWeek: number, dayOfWeek: number, value: number): Promise <boolean> {
      
     let updateField = `goalWeekPerf.$.daysGaolPerf.${dayOfWeek}`;
       
     const upd = await this.compGoalModel.updateOne({_id: comGoal_Id,"goalWeekPerf.fDayOfWeek": fDayOfWeek},
     {$inc: {[updateField]: value, "goalPerf.overallPerf": value}});
    
     return upd.nModified;
}


   async statusToHold(id: string) {
      console.time("toInActive")
      const compGoal = await this.compGoalModel.findById(id);

      //!!!poprawić w ubdate wyzerować poszczególne pola właściwości z dawnego goal perf i stworzuć nowy goal perf i zapisac w perfHistory 
      if (compGoal.isActive()){
                  
      compGoal.setInActive(
         this.dayCount(moment.utc().startOf("days").valueOf()),
         moment.utc().startOf("day").valueOf(), 
         GoalStatus.HOLD
         );
                       
     await compGoal.save();
     console.timeEnd("toInActive")

     return true;
   } else return false; // poprawić zwracane wartości i sprawdzić czy trzeba stosować warunek else
      
              
     }

     async toHold2(id: string){
        console.time("hold2")
      const compGoal= await this.compGoalModel.findById(id).select("status", "goalPerf");
      if (!compGoal.isActive) {
         const update = {
            status: GoalStatus.DONE,
            goalPerf: new GoalPef (0,0,0,0,0),
            $push: {
               perfHistory: compGoal.goalPerf, 
               goalWeekPerf: {$each: [],$slice: 0}}
         };
         this.compGoalModel.updateOne({_id: id},update).exec(); 
         console.timeEnd("hold2")

      }
      return true;
     }

  // przemysłeć czy lepiej zrobić funkcje set active z nowymi warotściami, czy setinaactive to wyzerowania starych wartości
   async statusToActive (id: string) {
      const compGoal: CompetenceGoal= await this.compGoalModel.findById(id);
     if (!compGoal.isActive) {
      compGoal.status= GoalStatus.ACTIVE;
      
      compGoal.saveActive();
      return true;
     }
   }



   //!!!zmienić porównania oraz znowu przemyslec czy zrobic ubpdate zamiast save
   async statusToDone (id: string) {
      const compGoal= await this.compGoalModel.findById(id).select("status", "goalPerf");
      
      if (!compGoal.isActive) {
         compGoal.status=GoalStatus.DONE;
         compGoal.save();
         console.log("Z Hold");
         
// !!takie zmiany jak przy to hold ponadto zrobic jedna metode
} else {
   const update = {
      status: GoalStatus.DONE,
      goalPerf: new GoalPef (0,0,0,0,0),
      $push: {
         perfHistory: compGoal.goalPerf, 
         goalWeekPerf: {$each: [],$slice: 0}}
   };
   this.compGoalModel.updateOne({_id: id},update).exec(); 
}
   return true;
}

   async delete(id: string) {
   
      await  this.compGoalModel.deleteOne({_id: id});
      return true;
   }

   async update (id: string, update: UpdateCompetenceGoalInput) {
    
     return await this.compGoalModel.findByIdAndUpdate({_id: id},update, {new: true});

   }

   dayCount (startActive: number): number {
      const sActv = moment.utc(startActive);
      const now = moment.utc().startOf("day");
      return now.diff(sActv, "day")+1;
   }
*/
}