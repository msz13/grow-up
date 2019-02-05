import * as mongoose from 'mongoose';
import {CompetenceGoal} from './competence-goal.model'
import { GoalStatus } from '../../common/graphql.schema';
import parse = require('date-fns/parse');
import * as fs from 'fs';
import * as util from 'util';


describe('CompetenceGoal Model Test', () => {

    beforeAll(()=> {
        mongoose.connect('mongodb://test_admin:admin1@ds046037.mlab.com:46037/type_test');
        
        });

    afterAll(()=> {
        mongoose.connection.close();
    });

    beforeEach(()=> {
       
    });
    
    

        test("should save Competence Goal", async ()=>{
          const CompGoalModel = new CompetenceGoal().getModelForClass(CompetenceGoal);
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
           const competenceGoal = new CompGoalModel(compGoal);
           const foundcompGoal =  await competenceGoal.save();
          
           expect(foundcompGoal).toHaveProperty('competence')
           expect(foundcompGoal).toHaveProperty('target', 1)
           

        })

        test('Competence Goal saveActive', async ()=>{
            const CompGoalModel = new CompetenceGoal().getModelForClass(CompetenceGoal);
            
            const compGoal = {
                name: 'mówić dzień dobry brudnej babie',
                competence: "uprzejmość",
                target: 1        
            }

            let now = parse('2019-01-31');

            const competenceGoal = new CompGoalModel(compGoal);
            
            const foundcompGoal = await competenceGoal.saveActive(now);
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