import { ActiveCompetenceGoal } from './active-competence-goal.entity';
import { GoalStatus } from './competenceGoal.entity';


describe('ActiveCompetenceGoal', () => {
  const date = '2019-03-10'
  let compGoal: ActiveCompetenceGoal;
  beforeAll(()=>{
    const compGoalInput = {
      name: "Dwa",
      competence: "KompetencjaJeden",
      target: 1,        
  }
     compGoal = new ActiveCompetenceGoal(compGoalInput, new Date(date))
  });
  
  it('should be defined', () => {
    
    expect(compGoal).toBeTruthy();
    
    });

  it('initiate class with competencegoal input', () => {      
  
      expect(compGoal.name).toBe("Dwa");
      expect(compGoal.target).toBe(1);
      expect(compGoal.status).toBe(GoalStatus.ACTIVE)
      expect(compGoal.startActive).toBe(date)
     

      });

  it('goalDaysPerf should have length 8 and last object shuld match expected', ()=>{
     
      expect(compGoal.goalDaysPerf).toHaveLength(8)
      expect(compGoal.getLastDayPerf().id).toBeTruthy()
      expect(compGoal.getLastDayPerf().date).toBe('2019-03-17')
      expect(compGoal.getLastDayPerf().perfCount).toBe(0)
      expect(compGoal.getLastDayPerf().targetIsDone).toBe(false)
    })

    test.each`
    value| target| isOnTarget| effectivenes
    ${1} | ${2}  | ${false}  | ${0}
    ${2} | ${2}  | ${true}  | ${1}
    ${3} | ${2}  | ${true}  | ${1}
    ${2} | ${2}  | ${true}  | ${1}
    ${1} | ${2}  | ${false}  | ${0}
    `
    ('updatePerf should return onTarget $isOnTarget and effectivenes $effectivenes',({value, target, isOnTarget, effectivenes })=>{
      compGoal.updatePerf(value, target)
      const dayPerf = compGoal.goalDaysPerf[0]
      expect(dayPerf.perfCount).toBe(value)
      expect(dayPerf.targetIsDone).toBe(isOnTarget)
    })

    it('dayCount', () => {
    
      expect(compGoal.dayCount('2019-03-16')).toBe(7);
      
    });

    it('needs to update performance', () => {
    
      expect(compGoal.needsToUpdateGoalPerf('2019-03-17')).toBeFalsy;
      expect(compGoal.needsToUpdateGoalPerf('2019-03-18')).toBeTruthy;
      });


      it('create Day Performance List', () => {
       const goalDaysPerf =  compGoal.createGoalDayPerfList("lastDay", 8)
       const expected = {
         id: expect.any(Number),
         date: '2019-03-18',
         perfCount: 0,
         targetIsDone: false

       }
        expect(goalDaysPerf).toHaveLength(8)
        expect(goalDaysPerf[0]).toMatchObject(expected)
        expect(goalDaysPerf[goalDaysPerf.length-1].date).toBe('2019-03-25')
        ;
        
        });

        it('Should  create goal performance history object', ()=> {
         const  goalPerfHistory = compGoal.createPerfHistory('2019-03-20')

         const expected = {
           startActive: '2019-03-10',
           endActive: '2019-03-20',
           dayCount: 11,
           daysOnTarget: 0

         }
         
         expect(goalPerfHistory).toMatchObject(expected)

         }

        )
 
  
});
