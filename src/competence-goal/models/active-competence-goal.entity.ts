import { CompetenceGoal, GoalStatus } from "./competenceGoal.entity";
import { Column, Entity } from "typeorm";
import { GoalDayPerf, GoalPerfHistory } from "./competence-goal-perf.model";
import { DateStr } from "../../common/types";
import { format, addDays, parse, differenceInCalendarDays } from "date-fns";
import { ObjectID } from "mongodb";

@Entity('competencegoals')
export class ActiveCompetenceGoal extends CompetenceGoal {

  constructor({ name = '', competence = '', target = 1, createdBy = '' } = {}, startActive?: Date) {
    super(name, GoalStatus.ACTIVE, target, competence, createdBy)
    this.startActive = format(startActive, 'YYYY-MM-DD')
    this.goalDaysPerf = this.createGoalDayPerfList(startActive, 8);
  }

  
  @Column()
  startActive?: DateStr;

  
  @Column()
  daysOnTarget?: number = 0;

  @Column()
  goalDaysPerf?: GoalDayPerf[] = [];

  dayCount(date: DateStr) {
    return differenceInCalendarDays(date, this.startActive) + 1
  }



  needsToUpdateGoalPerf(actualDate: DateStr) {
    if (this.getLastDayPerf().date < actualDate) return true
    else return false  
  }

  getLastDayPerf() {
    return this.goalDaysPerf[this.goalDaysPerf.length - 1]
  }

  createGoalDayPerfList(from: Date|'lastDay', length: number) {
    const startDate = (from==='lastDay')? addDays(this.getLastDayPerf().date, 1) : from  
    const daysGoalPerf: GoalDayPerf[] = [] as Array<GoalDayPerf>
    

    for (let i = 0; i < length; i++) {
      let day = format(addDays(startDate, i), 'YYYY-MM-DD')
      daysGoalPerf.push(new GoalDayPerf(day))
    }

    return daysGoalPerf
  }

  updatePerf(value: number, target: number) {
    this.goalDaysPerf[0].perfCount = value;
    const dayPerf = this.goalDaysPerf[0]

    if ((dayPerf.perfCount >= target) && !dayPerf.targetIsDone) {
      this.daysOnTarget++
      this.goalDaysPerf[0].targetIsDone = true
    }

    else if ((dayPerf.perfCount < target) && dayPerf.targetIsDone) {
      this.daysOnTarget--
      this.goalDaysPerf[0].targetIsDone = false
    }
  }

 
  createPerfHistory(endActive: DateStr){
   return new GoalPerfHistory(
     this.startActive,
     endActive,
     this.dayCount(endActive),
     this.daysOnTarget
   )
  }

}




