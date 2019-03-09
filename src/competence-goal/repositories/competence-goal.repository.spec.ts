import {CompetenceGoal, GoalStatus} from '../../competence-goal/models/competenceGoal.entity';
import {CompetenceGoalRepository} from './competence-goal.repository';
import { createConnection, Connection} from 'typeorm';
import { GoalDayPerf, GoalPerf, ActiveGoalPerf } from '../models/competence-goal-perf.model';
import {ObjectID} from 'mongodb'




  

describe ('Competence-Gaol Repository test', ()=>{

    let connection: Connection;
    let competenceGoalRepository: CompetenceGoalRepository;

    beforeAll(async ()=>{ connection = await createConnection({"type": "mongodb",
    "url": "mongodb://grow-up:grow-up1@ds161112.mlab.com:61112/grow-up", 
    "synchronize": true,
    "logging": true,
    "entities": [
     // "/**/**.entity{.ts,.js}"
     CompetenceGoal
    ]} 
    )
    console.log("connection created")
    competenceGoalRepository = connection.getCustomRepository(CompetenceGoalRepository);
})

afterAll (()=> {connection.close()})
    
test('It should update day performance list', async ()=>{
    
    const comGoal = {
        name: "Dwa",
        competence: "KompetencjaJeden",
        target: 1,        
    }

    const createdCompGoal: CompetenceGoal = competenceGoalRepository.create(comGoal)  
    await competenceGoalRepository.saveActive(createdCompGoal, '2019-02-22');

    const comGoalActive:CompetenceGoal[] =  await competenceGoalRepository.findActive();
    expect(comGoalActive).toBeDefined();
    expect(comGoalActive[0].performance.goalDaysPerf).toHaveLength(16);
    await competenceGoalRepository.deleteOne({_id: comGoalActive[0].id})
    
    

})

describe("Update Performance", async ()=>{
    
    let compGoal1_2: CompetenceGoal
    
    beforeAll(async ()=>{
        const comGoal = {
            name: "Find for Upd Perf",
            competence: "KompetencjaJeden",
            target: 1,        
        }
        
        const compGoal1: CompetenceGoal = competenceGoalRepository.create(comGoal) 
        compGoal1_2 = await competenceGoalRepository.saveActive(compGoal1, '2019-02-01');
    })

    afterAll(async ()=> {
      await  competenceGoalRepository.deleteOne({_id: compGoal1_2.id})
    });
    

    
    
       

    test('Should find comp Goal for Update Perf', async ()=>{
         
                
        console.time('Find Activ for Upd Perf')
        const compGoal1_3 = await competenceGoalRepository.findActiveforUpdPerf(compGoal1_2.id, "2019-02-02")
        console.timeEnd('Find Activ for Upd Perf') //const compGoal1_3 = await competenceGoalRepository.createEntityCursor({_id: compGoal1_2.id}).next()
        
        expect(compGoal1_3).toBeDefined()
        expect(compGoal1_3).toHaveProperty('target', 1)
        expect(compGoal1_3.name).toBeUndefined()
        expect(compGoal1_3.performance.goalDaysPerf).toHaveLength(1)    
    
    })
    
    test("Should return updated Goal Perf", async ()=>{
      const  dayPerf:GoalDayPerf = new GoalDayPerf("2019-02-02", 1 )
       
      console.time('Update Perf')
      const goalPerf = await competenceGoalRepository.updatePerf(compGoal1_2.id,4,dayPerf)
      console.timeEnd('Update Perf')
    
     expect(goalPerf.startActive).toBeTruthy()
     expect(goalPerf.goalPerfEffectivenes).toBe(0)

     
    })
})



})
