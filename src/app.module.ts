import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CompetencesModule } from '../src/competences/competences.module';
import { CompetenceGoalModule } from './competence-goal/competence-goal.module';
import { GraphQLDate} from 'graphql-iso-date';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ActiveCompetenceGoal } from './competence-goal/models/active-competence-goal.entity';
import {ConfigModule, ConfigService} from 'nestjs-config';
import { HelloModule } from './hello/hello.module';
import * as path from 'path'


@Module({
  imports: [
    GraphQLModule.forRoot({

      typePaths: ['./**/*.graphql'],

     // installSubscriptionHandlers: true,     
            
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
  }),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),    
    CompetenceGoalModule,
    UserProfileModule,
    HelloModule
  ],
  providers: [],
  })
export class ApplicationModule {}
