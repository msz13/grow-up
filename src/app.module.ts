import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { CompetencesModule } from '../src/competences/competences.module';
import { CompetenceGoalModule } from './competence-goal/competence-goal.module';
import { GraphQLDate} from 'graphql-iso-date'


@Module({
  imports: [
    GraphQLModule.forRoot({

      typePaths: ['./**/*.graphql'],

      installSubscriptionHandlers: true,
      resolvers: {Date: GraphQLDate},
      
    }),
    TypegooseModule.forRoot('mongodb://grow-up:grow-up1@ds161112.mlab.com:61112/grow-up'),
    CompetencesModule,
    CompetenceGoalModule
  ],
  providers: [],
})
export class ApplicationModule {}
