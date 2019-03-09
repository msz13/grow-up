import { Args, Mutation, Query, Resolver, ResolveProperty, Parent, Info } from '@nestjs/graphql';
import { GoalStatus } from './models/competenceGoal.entity';
import { CompetenceGoalService } from './services/competence-goal.service'; 
import { CreateCompetenceGoalInput } from './DTO/competence-goal-input';
import { CompetenceGoal, } from './models/competenceGoal.entity';

import moment = require('moment');
import { UpdateCompetenceGoalInput } from './DTO/competence-goal-update-input';
import format = require('date-fns/format');
import { ActiveGoalPerf, GoalDayPerf } from './models/competence-goal-perf.model';

import { parseResolveInfo, simplifyParsedResolveInfoFragmentWithType, ResolveTree } from 'graphql-parse-resolve-info';
import {writeFile} from 'fs'




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
  createCompGoal(@Args('competenceGoalInput') args: CreateCompetenceGoalInput, @Info() resolverInfo: any): Promise<CompetenceGoal> {
   
    /* Take args from day perf field and put to findActive
    const parsedResolveInfoFragment = parseResolveInfo(resolverInfo);
    const  simpleInfo=   simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment as ResolveTree,
      resolverInfo.returnType
  );*/
    
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
  
/*
    
     
  

  //@ResolveProperty()
  //weekCount(@Parent() competenceGoal: CompetenceGoal, @Args('day') day: Date) {
  // return  competenceGoal.weekCount(day);
       
  //}
/*
  @Resolver('ActiveGoalPerf')
  @ResolveProperty('dayCount')
  dayCount(@Parent() competenceGoal: CompetenceGoal) {
  console.log("Day Count called")
  return 13;  //competenceGoal.performance.dayCount(day);
   
  }*/

}


@Resolver('ActiveGoalPerf')
export class ActiveGoalPerfResolver {
  constructor(private readonly competenceGoalService: CompetenceGoalService) {}

  @ResolveProperty('dayCount')
  dayCount(@Parent() goalPerf: ActiveGoalPerf) {
  console.log('DayCount Resolver called')
  //return this.competenceGoalService.dayCount(goalPerf.startActive);
  }

  @ResolveProperty('goalDayPerf')
  goalDayPerf(@Parent() goalPerf: ActiveGoalPerf, @Args('from') from: DateStr, @Args('to') to: DateStr){
    console.log("Goal day Perf resolver called", from.toString())
          return this.competenceGoalService.getGoalDayPerf(goalPerf.goalDaysPerf, from, to)
  }


}





