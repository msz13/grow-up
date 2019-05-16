import { Args, Mutation, Query, Resolver, ResolveProperty, Parent, Info, Context } from '@nestjs/graphql';
import { CompetenceGoalService } from './services/competence-goal.service'; 
import { CreateCompetenceGoalInput } from './DTO/competence-goal-input';
import {ActiveCompetenceGoal} from './models/active-competence-goal.entity'

import { UpdateCompetenceGoalInput, UpdatePerfInput, UpdateCompGoalPerfPayload } from './DTO/competence-goal-update-input';
import format = require('date-fns/format');
import { parseResolveInfo, simplifyParsedResolveInfoFragmentWithType, ResolveTree } from 'graphql-parse-resolve-info';

import { DateStr } from '../common/types';
import { ValidationPipe } from '@nestjs/common';
import { ContextCreator } from '@nestjs/core/helpers/context-creator';






@Resolver('ActiveCompetenceGoal')
export class CompetenceGoalResolvers {
  constructor(private readonly competenceGoalService: CompetenceGoalService) {}

 
  @Query('activeCompetenceGoals')
  activeCompetenceGoals(@Args("competence") competence: string): Promise<ActiveCompetenceGoal[]>{
                 
      return  this.competenceGoalService.findActive(competence);
     /* Take args from day perf field and put to findActive
    const parsedResolveInfoFragment = parseResolveInfo(resolverInfo);
    const  simpleInfo=   simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment as ResolveTree,
      resolverInfo.returnType
  );*/
     
  }

  @Mutation('createActiveCompGoal')
  createActiveCompGoal(@Args('competenceGoalInput') args: CreateCompetenceGoalInput, @Info() resolverInfo: any): Promise<ActiveCompetenceGoal> {
    return this.competenceGoalService.create(args);
  }
  @ResolveProperty('id')
  id(@Parent() competenceGoal) {
    return (competenceGoal.id)? competenceGoal.id.toHexString() : competenceGoal._id.toHexString()
   
  }
  @ResolveProperty('dayCount')
  dayCount(@Parent() competenceGoal: ActiveCompetenceGoal) {
    return this.competenceGoalService.dayCount(competenceGoal.startActive);
   
  }


  @ResolveProperty('goalDaysPerf')
  goalDayPerf(@Parent() compGoal: ActiveCompetenceGoal, @Args('from') from: DateStr, @Args('to') to: DateStr){
         return this.competenceGoalService.getGoalDayPerf(compGoal.goalDaysPerf, from, to)
  }

  @ResolveProperty('todayPerf')
  todayPerf(@Parent() compGoal: ActiveCompetenceGoal ){
       return this.competenceGoalService.getTodayPerf(compGoal.goalDaysPerf)
  }

  @Mutation('updatePerf')
  async updatePerf(@Args('updateCompGoalPerfInput', new ValidationPipe({transform: true})) input: UpdatePerfInput, @Context() ctx: object) {
    
    
    const updatedCompGoal =  await this.competenceGoalService.updatePerf(input.compGoal_Id,input.day, input.value)
     return new UpdateCompGoalPerfPayload(updatedCompGoal)
  }

  

  //@Mutation()
  //goalStatusToHold(@Args("goal_Id") id: string) {
  //     return this.competenceGoalService.statusToHold(id);    
     
  //}

  //@Mutation()
  //goalStatusToActive(@Args("goal_Id") id: string) {
  //  return this.competenceGoalService.statusToActive(id);    
 
  //}

  //@Mutation()
  //goalStatusToDone (@rgs("goal_Id") id: string){
  //  return this.competenceGoalService.statusToDone(id);
  //}

  @Mutation()
  async deleteCompGoal(@Args("goal_Id") id: string) {
    const  deletedCompetenceGoalId = await this.competenceGoalService.delete(id);
    return {deletedCompetenceGoalId: deletedCompetenceGoalId}
  }

  //@Mutation()
  //updateComGoal(@Args("goal_Id") id: string, @Args('updateCompetenceGoalInput') args: UpdateCompetenceGoalInput) {
  // 
  //    return this.competenceGoalService.update(id, args);
  //}
  
/*
    
     
  

  //@ResolveProperty()
  //weekCount(@Parent() competenceGoal: CompetenceGoal, @Args('day') day: Date) {
  // return  competenceGoal.weekCount(day);
       
  //}
*/
  
 

}








