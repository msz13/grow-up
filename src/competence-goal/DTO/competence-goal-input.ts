import { IsNotEmpty } from "class-validator";
import { CreatedBy } from "src/common/user.decorator";

export class CreateCompetenceGoalInput {


name: string;
competence?: string;
target: number;

}


export interface CreateCompetenceGoalInputByU extends CreateCompetenceGoalInput, CreatedBy {}