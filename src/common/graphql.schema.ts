export enum GoalStatus {
    ACTIVE = "ACTIVE",
    DONE = "DONE",
    HOLD = "HOLD"
}

export interface CompetenceGoalInput {
    name: string;
    competence?: string;
    status?: GoalStatus;
}

export interface ActvDates {
    sActv?: Date;
    eActv?: Date;
}

export interface CompetenceGoal {
    id?: ObjectId;
    name: string;
    competence?: string;
    status?: GoalStatus;
    actvDates?: ActvDates[];
    weekCount?: number;
    dayCount?: number;
    overallPerf?: number;
    goalWeekPerf?: GoalWeekPerf;
}

export interface GoalWeekPerf {
    firstDayOfWeek?: Date;
    fDayActv?: number;
    lDayActv?: number;
    daysGaolPerf?: number[];
    dayGoalPerf(dayOfWeek?: number): number | Promise<number>;
}

export interface IMutation {
    createCompGoal(competenceGoalInput?: CompetenceGoalInput): CompetenceGoal | Promise<CompetenceGoal>;
}

export interface IQuery {
    competenceGoals(status?: GoalStatus, competence?: string): CompetenceGoal[] | Promise<CompetenceGoal[]>;
    temp__(): boolean | Promise<boolean>;
}

export type Date = any;
export type ObjectId = any;
