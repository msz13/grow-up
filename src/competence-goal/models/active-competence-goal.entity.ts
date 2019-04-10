import { CompetenceGoal, GoalStatus } from "./competenceGoal.entity";
import { Column, Entity } from "typeorm";
import { GoalDayPerf } from "./competence-goal-perf.model";
import { DateStr } from "../../common/types";
import { format, addDays, parse, differenceInCalendarDays } from "date-fns";
import { ObjectID } from "mongodb";

@Entity('competencegoals')
export class ActiveCompetenceGoal extends CompetenceGoal {

  constructor({ name = '', competence = '', target = 1 } = {}, startActive?: Date) {
    super(name, GoalStatus.ACTIVE, target, competence)
    this.startActive = format(startActive, 'YYYY-MM-DD')
    this.goalDaysPerf = this.createGoalDayPerfList(startActive);
  }

  
  
  @Column()
  startActive?: DateStr;


  @Column()
  overallPerf?: number = 0;

  @Column()
  daysOnTarget?: number = 0;

  @Column()
  goalDaysPerf?: GoalDayPerf[] = [];

  dayCount(date: DateStr) {
    return differenceInCalendarDays(date, this.startActive) + 1
  }



  needsToUpdateGoalPerf(actualDate: DateStr) {
    return (this.getLastDayPerf().date < actualDate) ? true : false
  }

  getLastDayPerf() {
    return this.goalDaysPerf[this.goalDaysPerf.length - 1]
  }

  createGoalDayPerfList(from?: Date|'lastDay') {
    const startDate = (from==='lastDay')? addDays(this.getLastDayPerf().date, 1) : from  
    const daysGoalPerf: GoalDayPerf[] = [] as Array<GoalDayPerf>
    

    for (let i = 0; i < 8; i++) {
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

}




