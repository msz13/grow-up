import { Module } from '@nestjs/common';
import { CompetenceGoal } from './models/competenceGoal.entity';
import { CompetenceGoalService } from './services/competence-goal.service';
import { CompetenceGoalResolvers, ActiveGoalPerfResolver} from './competence-goal.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenceGoalRepository } from './repositories/competence-goal.repository';
import { ObjectIdScalar } from '../common/scalars/objectId';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { ActiveGoalPerf } from './models/competence-goal-perf.model';

@Module({
    imports: [TypeOrmModule.forFeature([CompetenceGoal, CompetenceGoalRepository]), UserProfileModule],
    providers: [CompetenceGoalService, CompetenceGoalResolvers, ActiveGoalPerfResolver, ObjectIdScalar]
})
export class CompetenceGoalModule {}
