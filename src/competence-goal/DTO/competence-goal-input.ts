import { GoalStatus, CompetenceGoalInput } from "../../common/graphql.schema";

export class CreateCompetenceGoalInput implements CompetenceGoalInput {


name: string;
competence?: string;
target: number;

}