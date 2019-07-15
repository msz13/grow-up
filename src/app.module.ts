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
import { AuthModule } from './auth/auth.module';
import {verifyToken} from './common/authUtill'
import * as path from 'path'
import { JwtPayload } from './common/authUtill';
import { AuthenticationError } from 'apollo-server-core';


const auth =  async ({ req }) => {
  
 try {const  {sub: id} =  await verifyToken(req.headers.authorization) as JwtPayload

  
   return {
    user: {id: id}
   };
  }

catch (err) {
  console.error(err)
  throw new AuthenticationError('You have to be authenticated')
}
}



@Module({
  imports: [
    GraphQLModule.forRoot({

      typePaths: ['./**/*.graphql'],
      context: auth

     // installSubscriptionHandlers: true,

    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
  }),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),    
    CompetenceGoalModule,
    UserProfileModule,
    HelloModule,
    AuthModule
  ],
  providers: [],
  })
export class ApplicationModule {}
