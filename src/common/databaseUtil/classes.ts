import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity('animal')
export  class Dog {
    
    @ObjectIdColumn()
    id: ObjectId
    @Column()
     name: string
     @Column()
     buda: string
 }

 @Entity('animal')
 export class Cat {
     constructor (){}
     @ObjectIdColumn()
     id: ObjectId
     @Column()
     name: string
     @Column()
     kuweta: string
 }
 