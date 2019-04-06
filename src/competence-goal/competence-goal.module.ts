import { Module } from '@nestjs/common';
import { CompetenceGoal } from './models/competenceGoal.entity';
import { CompetenceGoalService } from './services/competence-goal.service';
import { CompetenceGoalResolvers} from './competence-goal.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenceGoalRepository } from './repositories/competence-goal.repository';
import { ObjectIdScalar } from '../common/scalars/objectId';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { ActiveCompetenceGoal } from './models/active-competence-goal.entity';
import { DateScalar } from '../common/scalars/date.scalar';
import { UserIdService } from './services/user-id/user-id.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActiveCompetenceGoal, CompetenceGoalRepository]), UserProfileModule],
    providers: [CompetenceGoalService, CompetenceGoalResolvers, DateScalar, UserIdService]
})
export class CompetenceGoalModule {}
