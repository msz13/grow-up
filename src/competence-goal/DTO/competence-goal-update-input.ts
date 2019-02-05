import { GoalStatus } from "../../common/graphql.schema";

export class UpdateCompetenceGoalInput{

    name?: string;
    
    competence?: string;
    
    status?: GoalStatus;
    
    target?: number;
    
    }