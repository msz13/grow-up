import { ObjectId} from "mongodb";
import { Node } from "src/common/databaseUtil/baseClasses";

class BaseClass {

    id: ObjectId

    get createdAt() {
        return this.id.getTimestamp()
    }

    updatedAt: Date
    
    createdBy: string
}

export class InputTask extends BaseClass{
  
    name: string

}

export class InputNote extends BaseClass {

    name: string

    text: string

}