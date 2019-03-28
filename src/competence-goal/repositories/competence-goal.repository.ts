import { CompetenceGoal } from "../models/competenceGoal.entity";
import { EntityRepository, MongoRepository} from "typeorm";
import {ObjectID} from 'mongodb'
import { GoalStatus } from "../models/competenceGoal.entity"
import { ActiveGoalPerf, GoalDayPerf } from "../models/competence-goal-perf.model";
import { LocalDate, nativeJs, convert } from "js-joda";
import { ActiveCompetenceGoal } from "../models/active-competence-goal.entity";
import { DateStr } from "../../common/types";
import { CreateCompetenceGoalInput } from "../DTO/competence-goal-input";

@EntityRepository(ActiveCompetenceGoal)
export class CompetenceGoalRepository extends MongoRepository<ActiveCompetenceGoal> {

      
   async  saveActive (competenceGoal: CreateCompetenceGoalInput,startActive:Date) {
        
      const createdCompGoal = new ActiveCompetenceGoal(competenceGoal, startActive)

      return await this.save(createdCompGoal);                               
      
    }

      
  

    async findActiveforUpdPerf(compGoal_Id: ObjectID, day: DateStr ){
       const projecton = {target: 1, 'daysOnTarget': 1, 'goalDaysPerf.$': 1}         
       return await this.createEntityCursor({_id: compGoal_Id, "goalDaysPerf.date": day }).project(projecton).next()
    }

    async updatePerf(id: ObjectID, effeciveness: number, dayPerf: GoalDayPerf) {
            
            const query = {
              _id: id,
               "goalDaysPerf.date": dayPerf.date
            }
      
            const update = {
             $set: {
               "daysOnTarget": effeciveness,
               "goalDaysPerf.$.perfCount": dayPerf.perfCount,
               "goalDaysPerf.$.targetIsDone": dayPerf.targetIsDone
             }
           }

           
          const {value: updatedCompGoal} = await this.findOneAndUpdate(query,
            update, 
            {maxTimeMS: 300, returnOriginal: false})
           
          return  updatedCompGoal
    }


}
