import {CompetenceGoalService} from './competence-goal.service'
import { parse, addDays, subDays } from 'date-fns';
import { ActiveGoalPerf } from '../models/competence-goal-perf.model';
import {Test, TestingModule} from '@nestjs/testing'
import { TypeOrmModule, getConnectionToken } from '@nestjs/typeorm';
import { CompetenceGoal } from '../models/competenceGoal.entity';
import {CompetenceGoalModule} from '../competence-goal.module';
import {ObjectID} from 'mongodb'

import { LocalDate } from 'js-joda';
import { ActiveCompetenceGoal } from '../models/active-competence-goal.entity';
import { UserProfileModule } from '../../user-profile/user-profile.module';




describe('Competence Goal Service', ()=>{

    let competenceGoalService: CompetenceGoalService;
    let connection: any;
    let connectionProvider: any
    let module: TestingModule
    
    beforeAll(async () => {
  
          module = await Test.createTestingModule({
          providers: [],
          imports: [ TypeOrmModule.forRoot({
            "type": "mongodb",
            "url": "mongodb://grow-up:grow-up1@ds161112.mlab.com:61112/grow-up", 
            "synchronize": true,
            "logging": false,
            "entities": [
             // "/**/**.entity{.ts,.js}"
             ActiveCompetenceGoal
            ],
            "subscribers": [
              "src/subscriber/*.js"
            ],
            "migrations": [
              "src/migration/*.js"
            ],
            "cli": {
              "entitiesDir": "src/entity",
              "migrationsDir": "src/migration",
              "subscribersDir": "src/subscriber"
            }
          }),CompetenceGoalModule, UserProfileModule],
        }).compile();
        competenceGoalService = module.get<CompetenceGoalService>(CompetenceGoalService);
        
      });

      afterAll (()=> {module.close()})
      
      it('should be defined', () => {
        expect(competenceGoalService).toBeDefined();
      });

 describe('Competence Goal Service Methods',()=>{
 
  beforeAll(async()=> {
    await competenceGoalService.create({
      name: "Dwa",
      competence: "KompetencjaJeden",
      target: 1,        
  })

  });
  
      
      test('Find Active',async ()=>{
       const  compGoals = await competenceGoalService.findActive('2019-03-09')
       console.dir(compGoals)
       expect(compGoals).toHaveLength(1)
       expect(compGoals[0]).toBeInstanceOf(ActiveCompetenceGoal)
      }
      )
    

        test ('getGoalDayPerf', ()=>{
            const now = LocalDate.parse('2019-02-02')
            const goalDayPerf = new ActiveGoalPerf(now);
            const chosenGoalDayPerf = competenceGoalService.getGoalDayPerf(goalDayPerf.goalDaysPerf, now.toString(), now.plusDays(3).toString())
            expect(chosenGoalDayPerf).toHaveLength(4) 
            
        })

        test.skip ('getGoalDayPerf2', ()=>{
            
            const goalDayPerf = ['2019-02-03', '2019-02-04','2019-02-13','2019-02-14', '2019-02-24'];
           // const chosenGoalDayPerf = competenceGoalService.getGoalDayPerf(goalDayPerf, '2019-02-04' , '2019-02-14')
           // expect(chosenGoalDayPerf).toHaveLength(3) 
            
        })
/*
        test ("Update Perf", async ()=>{
            const comGoalInput = {
                name: "Jeden",
                competence: "KompetencjaJeden",
                target: 2,        
            }
          const compGoal = await competenceGoalService.create(comGoalInput)
          expect(compGoal.id).toBeInstanceOf(ObjectID)
          
                   
         const goalDayPerf: ActiveGoalPerf =  await competenceGoalService.updatePerf(compGoal.id, new Date ("2019-03-06T23:00:00.000Z"),3)

        
         expect(goalDayPerf.goalPerfEffectivenes).toBe(1)

          
        })
*/
        })
   
   
})