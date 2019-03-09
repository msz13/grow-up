import { ActiveGoalPerf, GoalDayPerf } from "./competence-goal-perf.model";
import parse = require("date-fns/parse");
import { TextStyle } from "js-joda";


describe('Goal Day Perf Test', () => {

    test.each([['2019-02-03',1,1,false],['2019-02-03',undefined,null,null]])('Goal day constructor z liczbą i null',
    (startActive, perf, expectedPerf, expectedIsTarget )=>{
         expect(new GoalDayPerf(startActive,perf).perfCount).toBe(expectedPerf);
         expect(new GoalDayPerf(startActive,perf).targetIsDone).toBe(expectedIsTarget);
    })
});

describe('Competence Goal Perf Model', ()=>{

    let activeGoalPerf: ActiveGoalPerf;
    
   

       beforeAll(()=> {
           let now = parse ('2019-01-30')
        activeGoalPerf = new ActiveGoalPerf(now);
       });
       
    test('Checking Inheritance', ()=>{
        expect(activeGoalPerf).toHaveProperty('goalDayPerf');
        expect(activeGoalPerf).toHaveProperty('startActive');
        expect(activeGoalPerf).toHaveProperty('_whenToAddDayPerf');
        
    })

    test('Active Goal Perf', () => {
        let now = parse ('2019-01-30')
        expect(activeGoalPerf.startActive).toEqual(now);
        expect(activeGoalPerf.overallPerf).toBe(0);
        expect(activeGoalPerf.goalPerfEffectivenes).toBe(0);
        
    });

    test('Active Goal Perf Goal Day PErf list', () => {

        const lastDay = {   
            date:  parse ('2019-02-06'),
            perfCount: 0,
            targetIsDone: false,
           } 
        
        expect(activeGoalPerf.goalDayPerf).toHaveLength(8);
        expect(activeGoalPerf.goalDayPerf[7]).toEqual(lastDay);
        
    });


    test.each`
    value| target| isOnTarget| effectivenes
    ${1} | ${2}  | ${false}  | ${0}
    ${2} | ${2}  | ${true}  | ${1}
    ${3} | ${2}  | ${true}  | ${1}
    ${2} | ${2}  | ${true}  | ${1}
    ${1} | ${2}  | ${false}  | ${0}
    `
    ('Should return onTarget $isOnTarget and effectivenes $effectivenes',({value, target, isOnTarget, effectivenes })=>{
      activeGoalPerf.updatePerf(value, target)
      const dayPerf = activeGoalPerf.goalDayPerf[0]
      expect(dayPerf.perfCount).toBe(value)
      expect(dayPerf.targetIsDone).toBe(isOnTarget)
      expect(activeGoalPerf.goalPerfEffectivenes).toBe(effectivenes)
    })

    
   
})