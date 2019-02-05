import { WhereBuilder } from "./whereBuilder";

export class Query {
    [key: string]: any
    _keyFromWhereFunc: string|object
    $or: Query[]

    where (object): Query
    where (string): Function

    where(property): any {
        if (typeof property === 'string') {
            return this.whereBuilder(property);  
        } else {
       Object.assign(this,property)
       return this;
        }
       

    }

    whereBuilder(property: string) {
        this._keyFromWhereFunc=property;
        return new WhereBuilder(this);      
    }
}