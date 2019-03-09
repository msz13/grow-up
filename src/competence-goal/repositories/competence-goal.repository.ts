import { CompetenceGoal } from "../models/competenceGoal.entity";
import { EntityRepository, MongoRepository} from "typeorm";
import {ObjectID} from 'mongodb'
import { GoalStatus } from "../models/competenceGoal.entity"
import { ActiveGoalPerf, GoalDayPerf } from "../models/competence-goal-perf.model";
import { LocalDate, nativeJs, convert } from "js-joda";

@EntityRepository(CompetenceGoal)
export class CompetenceGoalRepository extends MongoRepository<CompetenceGoal> {

  
    
   async  saveActive (competenceGoal: CompetenceGoal,startActive:LocalDate) {

        competenceGoal.status=GoalStatus.ACTIVE;
        
        competenceGoal.performance= new ActiveGoalPerf(startActive);    
               
        const savedCompGoal: CompetenceGoal = await this.save(competenceGoal);     
               
        return savedCompGoal;
    }

      
  

    async findActiveforUpdPerf(compGoal_Id: ObjectID, day: DateStr ){
      const projecton = {target: 1, 'performance.goalPerfEffectivenes': 1, 'performance.goalDaysPerf.$': 1}         
       return await this.createEntityCursor({_id: compGoal_Id, "performance.goalDaysPerf.date": day }).project(projecton).next()
    }

    async updatePerf(id: ObjectID, effeciveness: number, dayPerf: GoalDayPerf) {
            
            const query = {
              _id: id,
               "performance.goalDaysPerf.date": dayPerf.date
            }
      
            const update = {
             $set: {
               "performance.goalPerfEffectivenes": effeciveness,
               "performance.goalDaysPerf.$": dayPerf
             }
           }

           const projection = {
            _id: 0, 
            performance: 1
           }

          const {value: {performance}} = await this.findOneAndUpdate(
            query, 
            update, 
            {maxTimeMS: 300, returnOriginal: false, projection: projection})
           
          return  performance
    }


}
