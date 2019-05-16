import {CompetenceGoal} from './competence-goal.entity'
import {CompetenceGoalRepository} from '../repositories/competence-goal.repository'
import { GoalStatus } from '../../common/graphql.schema';
import parse = require('date-fns/parse');
import * as fs from 'fs';
import * as util from 'util';
import {createConnection, Connection} from 'typeorm'



describe('CompetenceGoal Model Test', () => {

    let connection: Connection;
    //let compGoalRepository
    beforeAll(async ()=> {
       
       connection = await createConnection();    

             
        });

    afterAll(async ()=> {

        
        
    });

      
    
        test("should save Competence Goal", async ()=>{
           const  connection = await createConnection();    
            const  compGoalRepository = await connection.getCustomRepository(CompetenceGoalRepository);
          
          const compGoal = {
              name: 'mówić dzień dobry brudnej babie',
              competence: "uprzejmość",
              status: GoalStatus.ACTIVE,
              target: 1        
          }

          const  result = {
            name: 'mówić dzień dobry brudnej babie',
            competence: "uprzejmość",
            status: GoalStatus.ACTIVE,
            target: 1

          }
           const competenceGoal = new CompetenceGoal();
           competenceGoal.name= compGoal.name;
           competenceGoal.competence=compGoal.competence;
           competenceGoal.status=compGoal.status;
           competenceGoal.target=compGoal.target;
           const foundcompGoal =  await compGoalRepository.save(competenceGoal);
          
           expect(foundcompGoal).toHaveProperty('competence')
           expect(foundcompGoal).toHaveProperty('target', 1)
           

        })

        test('Competence Goal saveActive', async ()=>{
            const  compGoalRepository = await connection.getCustomRepository(CompetenceGoalRepository);
            const compGoal = {
                name: 'mówić dzień dobry brudnej babie',
                competence: "uprzejmość",
                target: 1        
            }

            let now = parse('2019-01-31');

                        
            const foundcompGoal = await compGoalRepository.saveActive(compGoal, now);
            expect(foundcompGoal).not.toBeNull()
            expect(foundcompGoal).toHaveProperty('status', GoalStatus.ACTIVE)
            const activeGoalPerf = foundcompGoal.performance;
            expect(activeGoalPerf.startActive).toEqual(now);
            expect(activeGoalPerf.overallPerf).toBe(0);
            expect(activeGoalPerf.goalPerfEffectivenes).toBe(0);
            expect(activeGoalPerf.dayCount(now)).toBe(1);
            expect(activeGoalPerf.weekCount(now)).toBe(1);
            })
        
});