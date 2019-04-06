import { Injectable, Inject, Scope } from '@nestjs/common';
import {CONTEXT} from '@nestjs/graphql'
import {random} from 'lodash'

@Injectable({ scope: Scope.REQUEST })
export class UserIdService {
    constructor(@Inject(CONTEXT) private readonly context){
        this.id=random(1000)
    }

    id: number

    get(){
        return this.context
    }


    
}
