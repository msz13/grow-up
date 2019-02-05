import {Query} from './query';
import {WhereBuilder} from './whereBuilder';
import {Logger} from '@nestjs/common'



describe('Mongo Query Test',()=>{

    

    test('Where with parameter object',()=>{
      const  query= new Query().where({name: "Mat"});
      expect(query).toHaveProperty('name',"Mat");
      expect(query).toBeInstanceOf(Query);
      console.log(JSON.stringify(query));
    })

    test('Where with parameter string, shuld return new WhereBuilder',()=>{
        const  whereBuilder= new Query().where({name: "Mat"}).where('age');
        console.log(JSON.stringify(whereBuilder));
        expect(whereBuilder).toHaveProperty('query._keyFromWhereFunc',"age");
        
      })
      
     test('It Should initiate new WhereBuilder object', ()=>{
       const whereBuilder = new WhereBuilder();
       expect(whereBuilder).toBeInstanceOf(WhereBuilder);
     }) 

     test('It Should call whereBuilder function', ()=>{
      const  query= new Query()
      const spy = jest.spyOn(query, 'whereBuilder');      
      query.where('age');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveReturned();
    }) 

    test('It should assaign gte operator',()=>{
      const query = new Query().where('age').gte(8);
      Logger.log(query);
      expect(query).toHaveProperty('age', {$gte: 8});
      expect(query).toBeInstanceOf(Query);
      
    })


    
})