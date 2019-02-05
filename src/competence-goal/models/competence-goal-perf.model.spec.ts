import { ActiveGoalPerf, GoalDayPerf } from "./competence-goal-perf.model";
import parse = require("date-fns/parse");
import { EROFS } from "constants";


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
       
    test.only('Checking Inheritance', ()=>{
        expect(activeGoalPerf).toHaveProperty('goalDayPerf');
        expect(activeGoalPerf).toHaveProperty('startActive');
        expect(activeGoalPerf).toHaveProperty('_whenToAddDayPerf');
        console.log(JSON.stringify(activeGoalPerf,null,5))
    })

    test('Active Goal Perf', () => {
        let now = parse ('2019-01-30')
        expect(activeGoalPerf.startActive).toEqual(now);
        expect(activeGoalPerf.overallPerf).toBe(0);
        expect(activeGoalPerf.goalPerfEffectivenes).toBe(0);
        expect(activeGoalPerf.dayCount(now)).toBe(1);
        expect(activeGoalPerf.weekCount(now)).toBe(1);
        console.log(JSON.stringify(activeGoalPerf))
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

    
   
})