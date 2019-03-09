import { Injectable, Inject } from '@nestjs/common';
import { CompetenceGoal} from '../models/competenceGoal.entity';
import { GoalStatus } from '../models/competenceGoal.entity';
import { CreateCompetenceGoalInput } from '../DTO/competence-goal-input';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

import { UpdateCompetenceGoalInput } from '../DTO/competence-goal-update-input';
import format = require('date-fns/format');
import { startOfToday, addDays, eachDay } from 'date-fns';
import { GoalDayPerf, ActiveGoalPerf, GoalPerf } from '../models/competence-goal-perf.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetenceGoalRepository } from '../repositories/competence-goal.repository';
import { Repository, MongoRepository } from 'typeorm';
import { UserDateTimeService } from '../../user-profile/user-date-time.service/user-date-time.service';
import { convert, LocalDate, nativeJs, ChronoUnit } from 'js-joda';

//!!! przemysleć sprawę dat, czy bierzemy z argumentów czy z moment, czy moment dajemy do serwisu

@Injectable()
export class CompetenceGoalService {

   
 
   constructor (
     @InjectRepository(CompetenceGoalRepository)
     private readonly competenceGoalRepository?: CompetenceGoalRepository,
   
     private readonly userDate?: UserDateTimeService
     ) {}

     /* createGoalDayPerfList (startActive: Date) {
         const dates = eachDay(startActive, addDays(startActive, 6))
         return dates.map((date: Date)=>{
            return new GoalDayPerf(date, 0);
            })
      }*/

      getGoalDayPerf(goalDayPerf: GoalDayPerf[], from: DateStr, to: DateStr) {
         return goalDayPerf.filter((goalDayPerf: GoalDayPerf)=>{
            return goalDayPerf.date >= from && goalDayPerf.date<= to
         })
      }
      
      getGoalDayPerf2(dates:string[],from: string, to: string) {
         return dates.filter((dates)=>{
            return dates>= from && dates<= to
         })
      }
       
   async findActive(daysPerfTo: DateStr, Competence?: string): Promise<CompetenceGoal[]> {
    
      let queryResult: CompetenceGoal[]=[]
    
      const cursor=   this.competenceGoalRepository.createEntityCursor().filter({status: GoalStatus.ACTIVE})

 
       while (await cursor.hasNext()) {
       const compGoal: CompetenceGoal =  await cursor.next()

       if (compGoal.performance.needsToUpdateGoalPerf(daysPerfTo)) {        
         compGoal.performance.goalDaysPerf = await this.addDaysPerf(compGoal, daysPerfTo)
       }
       
       queryResult.push(compGoal)
       
      }
   
     
      return queryResult;
    
     }
      
   
   async create(newGoal: CreateCompetenceGoalInput): Promise<CompetenceGoal> {
                
     const createdCompGoal: CompetenceGoal = this.competenceGoalRepository.create(newGoal)  
                
     return await this.competenceGoalRepository.saveActive(createdCompGoal, this.userDate.getUserDate().toString());             
   }

   
  async updatePerf(comGoal_Id: any /**zamienic na odpowiedni typ */, day: DateStr, value: number) {
     
      const compGoal = await this.competenceGoalRepository.findActiveforUpdPerf(comGoal_Id, day);
      compGoal.performance.updatePerf(value, compGoal.target);

      const {performance: { goalPerfEffectivenes}, performance: {goalDaysPerf: [goalDayPerf]}} = compGoal;
      
      return await this.competenceGoalRepository.updatePerf(comGoal_Id, goalPerfEffectivenes, goalDayPerf);

      
      }
      


/*

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
*/
   dayCount (startActive: Date): number {
      
      return this.userDate.getUserDate().until(LocalDate.from(nativeJs(startActive)),ChronoUnit.DAYS)+1;
   }

   private async addDaysPerf (compGoal: CompetenceGoal, maxDate: DateStr): Promise<GoalDayPerf[]> {
    
      const newdayPerfList = compGoal.performance.createGoalDayPerfList()
  
      const update = {$push: {"performance.goalDaysPerf": {$each: newdayPerfList}}}
  
      await this.competenceGoalRepository.updateOne({_id: compGoal.id},update)
      
      return newdayPerfList.filter((dayPerf: GoalDayPerf)=>{
        return dayPerf.date<=maxDate
      })  
        
      } 

}