import {CompetenceGoalService} from './competence-goal.service'
import { isThisHour, parse, addDays, subDays } from 'date-fns';
import { ActiveGoalPerf } from '../models/competence-goal-perf.model';



describe('Competence Goal Service', ()=>{

    let competenceGoalService: CompetenceGoalService;

    beforeEach(()=>{
        competenceGoalService = new CompetenceGoalService();
        })

        it('createGoalDayPerfList',()=>{
            const lastDay = {
                date:  parse ('2019-02-04'),
                perfCount: 0,
                targetIsDone: false,
            } 
            const goalDayPerf = competenceGoalService.createGoalDayPerfList(subDays(parse ('2019-02-04'), 6));
            expect(goalDayPerf).toHaveLength(7);
            expect(goalDayPerf[6]).toEqual(lastDay);
            console.log(JSON.stringify(goalDayPerf))

        }) 

        test ('getGoalDayPerf', ()=>{
            const now = parse('2019-02-02')
            const goalDayPerf = new ActiveGoalPerf(now);
            const chosenGoalDayPerf = competenceGoalService.getGoalDayPerf(goalDayPerf, now, addDays(now,3))
            expect(chosenGoalDayPerf).toHaveLength(4) 
            console.log(chosenGoalDayPerf);
        })
   
})