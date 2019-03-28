import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';
import { CompetencesModule } from '../src/competences/competences.module';
import { CompetenceGoalModule } from './competence-goal/competence-goal.module';
import { GraphQLDate} from 'graphql-iso-date';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CompetenceGoal } from './competence-goal/models/competenceGoal.entity';
import { ObjectIdScalar } from './common/scalars/objectId';
import { UserProfileModule } from '../src/user-profile/user-profile.module';
import { ActiveCompetenceGoal } from './competence-goal/models/active-competence-goal.entity';


@Module({
  imports: [
    GraphQLModule.forRoot({

      typePaths: ['./**/*.graphql'],

     // installSubscriptionHandlers: true,
            
    }),
    TypeOrmModule.forRoot({
      "type": "mongodb",
      "url": "mongodb://grow-up:grow-up1@ds161112.mlab.com:61112/grow-up", 
      "synchronize": true,
      "logging": false,
      "entities": [
       // "/**/**.entity{.ts,.js}"
       ActiveCompetenceGoal
      ],
      "subscribers": [
        "src/subscriber/*.js"
      ],
      "migrations": [
        "src/migration/*.js"
      ],
      "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
      }
    }),
    CompetencesModule,
    CompetenceGoalModule,
    UserProfileModule
  ],
  providers: [],
  })
export class ApplicationModule {}
