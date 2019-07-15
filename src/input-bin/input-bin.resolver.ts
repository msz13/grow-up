import {InputTask, InputNote} from  './models/input-bin'
import { ObjectID } from 'mongodb';

abstract class InputBinResolver {

    abstract createInputTask(): InputTask    

    abstract createInputNote(): InputNote

    abstract deleteInputItem(): ObjectID

    abstract createNextAction() //NextAction

    abstract createProject()

    abstract createEvent()

    abstract doneTask()

    abstract addToProjectREference()

    abstract createSomedeyMaybe()
}