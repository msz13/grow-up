import {CompetenceGoalService} from './competence-goal.service'
import { parse, addDays, subDays } from 'date-fns';
import { ActiveGoalPerf } from '../models/competence-goal-perf.model';
import {Test, TestingModule} from '@nestjs/testing'
import { TypeOrmModule, getConnectionToken } from '@nestjs/typeorm';
import { CompetenceGoal } from '../models/competenceGoal.entity';
import {CompetenceGoalModule} from '../competence-goal.module';
import {ObjectID} from 'mongodb'
import { ExportDeclaration } from 'ts-simple-ast';
import { LocalDate } from 'js-joda';




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
             CompetenceGoal
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
          }),CompetenceGoalModule],
        }).compile();
        competenceGoalService = module.get<CompetenceGoalService>(CompetenceGoalService);
        
      });

      afterAll (()=> {module.close()})
      
      it('should be defined', () => {
        expect(competenceGoalService).toBeDefined();
      });


      test.only('Find Active',async ()=>{
       const  compGoals = await competenceGoalService.findActive('2019-03-09')
       console.dir(compGoals)
      }
      )
    

       it.skip('createGoalDayPerfList',()=>{
            const lastDay = {
                date:  parse ('2019-02-04'),
                perfCount: 0,
                targetIsDone: false,
            } 
            const goalDayPerf = competenceGoalService.createGoalDayPerfList(subDays(parse ('2019-02-04'), 6));
            expect(goalDayPerf).toHaveLength(7);
            expect(goalDayPerf[6]).toEqual(lastDay);
           
        }) 

        test ('getGoalDayPerf', ()=>{
            const now = LocalDate.parse('2019-02-02')
            const goalDayPerf = new ActiveGoalPerf(now);
            const chosenGoalDayPerf = competenceGoalService.getGoalDayPerf(goalDayPerf.goalDaysPerf, now.toString(), now.plusDays(3).toString())
            expect(chosenGoalDayPerf).toHaveLength(4) 
            
        })

        test ('getGoalDayPerf2', ()=>{
            
            const goalDayPerf = ['2019-02-03', '2019-02-04','2019-02-13','2019-02-14', '2019-02-24'];
            const chosenGoalDayPerf = competenceGoalService.getGoalDayPerf2(goalDayPerf, '2019-02-04' , '2019-02-14')
            expect(chosenGoalDayPerf).toHaveLength(3) 
            
        })

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
   
   
})