import { Query } from "./query";

export class WhereBuilder {

    constructor (query?: Query ){
        this.query=query;
    }
    
    query: Query;

    gte(value) {
        this.query[`${this.query._keyFromWhereFunc}`]= {
            $gte: value
           }
        return this.query
    }
}