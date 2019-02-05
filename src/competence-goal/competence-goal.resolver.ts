import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
import { GoalStatus } from '../common/graphql.schema';
import { CompetenceGoalService } from './services/competence-goal.service'; 
import { CreateCompetenceGoalInput } from './DTO/competence-goal-input';
import { CompetenceGoal, } from './models/competence-goal.model';

import moment = require('moment');
import { UpdateCompetenceGoalInput } from './DTO/competence-goal-update-input';
import format = require('date-fns/format');




@Resolver('CompetenceGoal')
export class CompetenceGoalResolvers {
  constructor(private readonly competenceGoalService: CompetenceGoalService) {}

  @Query()
  competenceGoals(@Args("status") status: GoalStatus, @Args("competence") competence: string): Promise<CompetenceGoal[]>|CompetenceGoal{
    
    if (status===GoalStatus.ACTIVE) {
      
      return  this.competenceGoalService.findActive(competence);
      
    } else 
        return null;
  }

  @Mutation()
  createCompGoal(@Args('competenceGoalInput') args: CreateCompetenceGoalInput): Promise<CompetenceGoal> {
   
    return this.competenceGoalService.create(args);
  } 

  //@Mutation()
  //incPerf(@Args("compGoal_Id") comGoal_Id: string, @Args("fDayOfWeek") fDayOfWeek: number,@Args("dayOfWeek") dayOfWeek: number) {
  //    return this.competenceGoalService.incPerf(comGoal_Id, fDayOfWeek, dayOfWeek, 1)
  //}

  //@Mutation()
  //decPerf (@Args("compGoal_Id") comGoal_Id: string, @Args("fDayOfWeek") fDayOfWeek: number,@Args("dayOfWeek") dayOfWeek: number) {
  //  return this.competenceGoalService.incPerf(comGoal_Id, fDayOfWeek, dayOfWeek, -1)
 // }

  //@Mutation()
  //goalStatusToHold(@Args("goal_Id") id: string) {
  //     return this.competenceGoalService.statusToHold(id);    
     
  //}

  //@Mutation()
  //goalStatusToActive(@Args("goal_Id") id: string) {
  //  return this.competenceGoalService.statusToActive(id);    
 
  //}

  //@Mutation()
  //goalStatusToDone (@Args("goal_Id") id: string){
  //  return this.competenceGoalService.statusToDone(id);
  //}

  //@Mutation()
  //deleteCompGoal(@Args("goal_Id") id: string) {
  //  return this.competenceGoalService.delete(id);
  //}

  //@Mutation()
  //updateComGoal(@Args("goal_Id") id: string, @Args('updateCompetenceGoalInput') args: UpdateCompetenceGoalInput) {
  // 
  //    return this.competenceGoalService.update(id, args);
  //}
  

  //@ResolvePrperty()
  //goalWeekPerf(@Parent() competenceGoal) {
       
  //  return competenceGoal.goalWeekPerf[0];
 // }

 // @ResolveProperty("dayGoalPerf")
 // dayGoalPerf (@Parent() competenceGoal, @Args("dayOfWeek") dayOfWeek: number ){
 //  const dayGoalPerf = competenceGoal[0].goalWeekPerf.daysGaolPerf[dayOfWeek];
 //   return dayGoalPerf;
 // } 

  
  //@ResolveProperty()
  //dayCount(@Parent() competenceGoal: CompetenceGoal, @Args('day') day: Date) {
  
  //return competenceGoal.dayCount(format(day, 'YYYY-MM-DD'));
  //}

  //@ResolveProperty()
  //weekCount(@Parent() competenceGoal: CompetenceGoal, @Args('day') day: Date) {
  // return  competenceGoal.weekCount(day);
       
  //}

  
   
}




