import { IsNotEmpty } from "class-validator";

export class CreateCompetenceGoalInput {


name: string;
competence?: string;
target: number;

}