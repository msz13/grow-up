import { Injectable } from '@nestjs/common';
import { CompetenceGoal } from '../models/competenceGoal.entity';
import { GoalStatus } from '../models/competenceGoal.entity';
import { CreateCompetenceGoalInput } from '../DTO/competence-goal-input';
import { UpdateCompetenceGoalInput } from '../DTO/competence-goal-update-input';
import format = require('date-fns/format');
import { startOfToday, addDays, eachDay, differenceInCalendarDays } from 'date-fns';
import { GoalDayPerf, } from '../models/competence-goal-perf.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetenceGoalRepository } from '../repositories/competence-goal.repository';

import { ObjectID, ObjectId } from 'mongodb'
import { UserDateTimeService } from '../../user-profile/user-date-time.service/user-date-time.service';

import { DateStr } from '../../common/types';
import { ActiveCompetenceGoal } from '../models/active-competence-goal.entity';
import { UserIdService } from './user-id/user-id.service';
import { CreateCompetenceGoalInputByU } from 'dist/competence-goal/DTO/competence-goal-input';


//!!! przemysleć sprawę dat, czy bierzemy z argumentów czy z moment, czy moment dajemy do serwisu

@Injectable()
export class CompetenceGoalService {



   constructor(
      @InjectRepository(CompetenceGoalRepository)
      private readonly competenceGoalRepository: CompetenceGoalRepository,
      private readonly userDate: UserDateTimeService,
   ) { }

   /* createGoalDayPerfList (startActive: Date) {
       const dates = eachDay(startActive, addDays(startActive, 6))
       return dates.map((date: Date)=>{
          return new GoalDayPerf(date, 0);
          })
    }*/

   async create(newGoal: CreateCompetenceGoalInputByU): Promise<ActiveCompetenceGoal> {

      return await this.competenceGoalRepository.saveActive(newGoal, this.userDate.getUserDate());

   }

   async findActive(Competence?: string): Promise<ActiveCompetenceGoal[]> {

      let queryResult: ActiveCompetenceGoal[] = []
      const daysPerfTo = format(this.userDate.getUserDate(), 'YYYY-MM-DD')

      const cursor = this.competenceGoalRepository.createEntityCursor().filter({ status: GoalStatus.ACTIVE })


      while (await cursor.hasNext()) {
         const compGoal: ActiveCompetenceGoal = await cursor.next()

         if (compGoal.needsToUpdateGoalPerf(daysPerfTo)) {
             const updDaysPerf = await this.addDaysPerf(
               compGoal.createGoalDayPerfList('lastDay', differenceInCalendarDays(daysPerfTo, compGoal.getLastDayPerf().date) + 8),
               compGoal.id,
               daysPerfTo
            )
            compGoal.goalDaysPerf=updDaysPerf
         }

         queryResult.push(compGoal)

      }


      return queryResult;

   }



   async updatePerf(compGoal_Id: ObjectID /**zamienic na odpowiedni typ */, day: DateStr, value: number): Promise<ActiveCompetenceGoal> {

      const compGoal = await this.competenceGoalRepository.findActiveforUpdPerf(compGoal_Id, day);

      compGoal.updatePerf(value, compGoal.target);

      const { daysOnTarget, goalDaysPerf: [goalDayPerf] } = compGoal;

      return await this.competenceGoalRepository.updatePerf(compGoal_Id, daysOnTarget, goalDayPerf);

   }

   getGoalDayPerf(goalDayPerf: GoalDayPerf[], from: DateStr, to: DateStr) {
      return goalDayPerf.filter((goalDayPerf: GoalDayPerf) => {
         return goalDayPerf.date >= from && goalDayPerf.date <= to
      })
   }

   getTodayPerf(goalDayPerf: GoalDayPerf[]): GoalDayPerf {
      const userNow = format(this.userDate.getUserDate(), 'YYYY-MM-DD')
      const [todayGoal] = goalDayPerf.filter((goalDayPerf: GoalDayPerf) => {
         return goalDayPerf.date == userNow
      })

      return todayGoal

   }

   dayCount(startActive: DateStr) {
      return differenceInCalendarDays(this.userDate.getUserDate(), startActive) + 1
   }



      
   async savePasive(id: ObjectID, status: GoalStatus) {
      console.time("toInActive")
      const activeCompGoal: ActiveCompetenceGoal = await this.competenceGoalRepository.createEntityCursor({id: ObjectID}).next();
      
       const perfHistory = activeCompGoal.createPerfHistory(format(this.userDate.getUserDate(),'YYYY-MM-DD'))
        
      
       const { startActive, daysOnTarget, goalDaysPerf, ...compGoal} = activeCompGoal
       
       compGoal.perfHistory = [perfHistory]
              
       const result = this.competenceGoalRepository.replaceOne({id: id}, compGoal)

        console.timeEnd("toInActive")
        
        console.log(result)

        if (result) {
         return compGoal 
      }

        else throw Error('Update of Competence Goal status failed')
  
                        
        }
   
        /*
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
   /*
    
   
      async update (id: string, update: UpdateCompetenceGoalInput) {
       
        return await this.compGoalModel.findByIdAndUpdate({_id: id},update, {new: true});
   
      }
   */

   async delete(id: string) {

      const result = await this.competenceGoalRepository.deleteOne({ _id: new ObjectId(id) }) as any

      if (result.n = 1) { return id }
      else console.log('not deleted');

   }


   private async addDaysPerf(goalDaysPerf: GoalDayPerf[], comGoalId: ObjectID, maxDate: DateStr): Promise<GoalDayPerf[]> {

      const update = { $push: { 'goalDaysPerf': { $each: [...goalDaysPerf] } } }

      await this.competenceGoalRepository.updateOne({ _id: comGoalId }, update)

      return goalDaysPerf.filter((dayPerf: GoalDayPerf) => {
         return dayPerf.date <= maxDate
      })

   }

}