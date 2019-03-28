import { Injectable, Inject } from '@nestjs/common';
import { CompetenceGoal } from '../models/competenceGoal.entity';
import { GoalStatus } from '../models/competenceGoal.entity';
import { CreateCompetenceGoalInput } from '../DTO/competence-goal-input';

import { UpdateCompetenceGoalInput } from '../DTO/competence-goal-update-input';
import format = require('date-fns/format');
import { startOfToday, addDays, eachDay, differenceInCalendarDays } from 'date-fns';
import { GoalDayPerf, ActiveGoalPerf, GoalPerf } from '../models/competence-goal-perf.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetenceGoalRepository } from '../repositories/competence-goal.repository';
import { Repository, MongoRepository} from 'typeorm';
import {ObjectID} from 'mongodb'
import { UserDateTimeService } from '../../user-profile/user-date-time.service/user-date-time.service';
import { convert, LocalDate, nativeJs, ChronoUnit } from 'js-joda';
import { DateStr } from '../../common/types';
import { ActiveCompetenceGoal } from '../models/active-competence-goal.entity';

//!!! przemysleć sprawę dat, czy bierzemy z argumentów czy z moment, czy moment dajemy do serwisu

@Injectable()
export class CompetenceGoalService {



   constructor(
      @InjectRepository(CompetenceGoalRepository)
      private readonly competenceGoalRepository?: CompetenceGoalRepository,

      private readonly userDate?: UserDateTimeService
   ) { }

   /* createGoalDayPerfList (startActive: Date) {
       const dates = eachDay(startActive, addDays(startActive, 6))
       return dates.map((date: Date)=>{
          return new GoalDayPerf(date, 0);
          })
    }*/

   async create(newGoal: CreateCompetenceGoalInput): Promise<ActiveCompetenceGoal> {

      return await this.competenceGoalRepository.saveActive(newGoal, this.userDate.getUserDate());

   }

   async findActive(Competence?: string): Promise<ActiveCompetenceGoal[]> {

      let queryResult: ActiveCompetenceGoal[] = []
      const daysPerfTo = format (this.userDate.getUserDate(), 'YYYY-MM-DD')

      const cursor = this.competenceGoalRepository.createEntityCursor().filter({ status: GoalStatus.ACTIVE })


      while (await cursor.hasNext()) {
         const compGoal: ActiveCompetenceGoal = await cursor.next()

         if (compGoal.needsToUpdateGoalPerf(daysPerfTo)) {
            compGoal.goalDaysPerf = await this.addDaysPerf(
            compGoal.createGoalDayPerfList(), 
            compGoal.id, 
            daysPerfTo
            )
         }

         queryResult.push(compGoal)

      }


      return queryResult;

   }




   async updatePerf(compGoal_Id: ObjectID /**zamienic na odpowiedni typ */, day: DateStr, value: number): Promise<ActiveCompetenceGoal> {
      const compGoal = await this.competenceGoalRepository.findActiveforUpdPerf(compGoal_Id, day);
      
      compGoal.updatePerf(value, compGoal.target);

      const { daysOnTarget, goalDaysPerf: [goalDayPerf]  } = compGoal;

      return await this.competenceGoalRepository.updatePerf(compGoal_Id, daysOnTarget, goalDayPerf);


   }

   getGoalDayPerf(goalDayPerf: GoalDayPerf[], from: DateStr, to: DateStr) {
      return goalDayPerf.filter((goalDayPerf: GoalDayPerf) => {
         return goalDayPerf.date >= from && goalDayPerf.date <= to
      })
   }

   getTodayPerf(goalDayPerf: GoalDayPerf[]): GoalDayPerf {
      const userNow = format(this.userDate.getUserDate(),'YYYY-MM-DD')
       const [todayGoal] = goalDayPerf.filter((goalDayPerf: GoalDayPerf)=>{
        return goalDayPerf.date==userNow
     })
     
     return todayGoal

   }

   dayCount(startActive: DateStr){
       return differenceInCalendarDays(this.userDate.getUserDate(), startActive) + 1
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
   

   private async addDaysPerf(goalDaysPerf: GoalDayPerf[], comGoalId: ObjectID, maxDate: DateStr): Promise<GoalDayPerf[]> {

      const update = { $push: { "goalDaysPerf": { $each: [...goalDaysPerf]} } }

      await this.competenceGoalRepository.updateOne({ _id: comGoalId }, update)

      return goalDaysPerf.filter((dayPerf: GoalDayPerf) => {
         return dayPerf.date <= maxDate
      })

   }

}