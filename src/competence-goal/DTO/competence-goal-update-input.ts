import { GoalStatus } from "../models/competenceGoal.entity";

export class UpdateCompetenceGoalInput{

    name?: string;
    
    competence?: string;
    
    status?: GoalStatus;
    
    target?: number;
    
    }