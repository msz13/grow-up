import { ObjectID } from "mongodb";
import { Column, Index } from "typeorm";
import {random} from 'lodash'

export class Node {

     constructor (){
        this.id= random(Number.MAX_SAFE_INTEGER)
    }
    
    @Column()
    @Index()
    id: number
}