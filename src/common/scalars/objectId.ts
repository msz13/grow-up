import { Scalar } from "@nestjs/graphql";
import {ObjectId} from 'mongodb';
import { Kind } from "graphql";


@Scalar("ObjectID")
export class ObjectIdScalar {
    parseValue(value: string) {
        return new ObjectId(value); // value from the client input variables
      }

    serialize(value: ObjectId) {
        return value.toHexString(); // value sent to the client
      }

    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
          return new ObjectId(ast.value); // value from the client query
        }
        return null;
      }
    
}