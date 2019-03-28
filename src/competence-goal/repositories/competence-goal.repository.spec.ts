import {CompetenceGoal, GoalStatus} from '../../competence-goal/models/competenceGoal.entity';
import {CompetenceGoalRepository} from './competence-goal.repository';
import { createConnection, Connection} from 'typeorm';
import { GoalDayPerf, GoalPerf, ActiveGoalPerf } from '../models/competence-goal-perf.model';
import {ObjectID} from 'mongodb'
import { TextStyle } from 'js-joda';
import { ActiveCompetenceGoal } from '../models/active-competence-goal.entity';




  

describe ('Competence-Gaol Repository test', ()=>{

    let connection: Connection;
    let competenceGoalRepository: CompetenceGoalRepository;
    let compGoalResult:ActiveCompetenceGoal;

    const comGoalInput = {
        name: "Dwa",
        competence: "KompetencjaJeden",
        target: 1,        
    }

    beforeAll(async ()=>{ try {connection = await createConnection({"type": "mongodb",
    "url": "mongodb://grow-up:grow-up1@ds161112.mlab.com:61112/grow-up", 
    "synchronize": true,
    "logging": true,
    "entities": [
     // "/**/**.entity{.ts,.js}"
     ActiveCompetenceGoal
    ]} 
    )
    console.log("connection created")
    } catch(e) {console.error(e)}
    
   competenceGoalRepository = connection.getCustomRepository(CompetenceGoalRepository);   
})

afterAll (()=> {connection.close()})

test('Create Competence Goal Repoistory', ()=>{
    expect(connection).toBeDefined()
    expect(competenceGoalRepository).toBeDefined()
})

test('save active', async ()=>{
   const  expected = {
        name: "Dwa",
        competence: "KompetencjaJeden",
        target: 1,
        status: GoalStatus.ACTIVE, 
        startActive: '2019-03-11'

    }

    compGoalResult= await competenceGoalRepository.saveActive(comGoalInput, new Date ('2019-03-11'))
    expect(compGoalResult).toMatchObject(expected)
    expect(compGoalResult).toBeInstanceOf(ActiveCompetenceGoal)
    expect(compGoalResult.goalDaysPerf).toHaveLength(8)
    expect(compGoalResult.dayCount('2019-03-11')).toBe(1)
    

    
})

test('Should find comp Goal for Update Perf', async ()=>{
         
                
    console.time('Find Activ for Upd Perf')
    const compGoal1_3 = await competenceGoalRepository.findActiveforUpdPerf(compGoalResult.id, "2019-03-13")
    console.timeEnd('Find Activ for Upd Perf') //const compGoal1_3 = await competenceGoalRepository.createEntityCursor({_id: compGoal1_2.id}).next()
    
    expect(compGoal1_3).toBeDefined()
    expect(compGoal1_3).toHaveProperty('target', 1)
    expect(compGoal1_3.name).toBe('')
    expect(compGoal1_3.goalDaysPerf).toHaveLength(1)    

})


test("Should return updated Goal Perf", async ()=>{
    const  dayPerf:GoalDayPerf = {
       id: 13, 
       date: "2019-03-11",
       perfCount: 1,
       targetIsDone: false
    }
     console.dir(dayPerf)
    console.time('Update Perf')
    const updatedPerfCompGoal: ActiveCompetenceGoal = await competenceGoalRepository.updatePerf(compGoalResult.id,4,dayPerf)
    console.timeEnd('Update Perf')
  
   expect(updatedPerfCompGoal.startActive).toBeTruthy()
   expect(updatedPerfCompGoal.goalPerfEffectivenes).toBe(4)
   expect(updatedPerfCompGoal.goalDaysPerf[0]).toMatchObject({
       id: expect.any(Number),
       date: "2019-03-11",
       perfCount: 1,
       targetIsDone: false
       
     })
   
  })
    
test('It should delate one', async ()=>{
    
    
      
    await competenceGoalRepository.deleteOne({_id: compGoalResult.id})
    const deleted = await competenceGoalRepository.findByIds([compGoalResult.id])
    expect(deleted).toHaveLength(0)
    

})


     
      

    
    
    





})
