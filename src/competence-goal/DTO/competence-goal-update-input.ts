import { GoalStatus } from "../models/competenceGoal.entity";
import { ObjectID } from "mongodb";
import { ActiveCompetenceGoal } from "../models/active-competence-goal.entity";
import { DateStr } from "../../common/types";
import { Type, Transform } from 'class-transformer'
import {Min} from 'class-validator'





export class UpdatePerfInput {
    @Type(()=>ObjectID)
    @Transform(value=> new ObjectID(value))
    compGoal_Id: ObjectID
    day: DateStr
    @Min(0)
    value: number
  }

  export class UpdateCompGoalPerfPayload {

      constructor(public activeCompetenceGoal: ActiveCompetenceGoal) 
      {} 

  }

export class UpdateCompetenceGoalInput{

    name?: string;
    
    competence?: string;
    
    status?: GoalStatus;
    
    target?: number;
    
    }