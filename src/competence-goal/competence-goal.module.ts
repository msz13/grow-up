import { Module } from '@nestjs/common';
import { CompetenceGoal } from './models/competence-goal.model';
import { CompetenceGoalService } from './services/competence-goal.service';
import { CompetenceGoalResolvers} from './competence-goal.resolver';
import { TypegooseModule } from 'nestjs-typegoose';
import { DateScalar } from '../common/scalars/date.scalar';
import { ObjectIdScalar } from '../common/scalars/objectId';

@Module({
    imports: [TypegooseModule.forFeature(CompetenceGoal)],
    providers: [CompetenceGoalService, CompetenceGoalResolvers]
})
export class CompetenceGoalModule {}
