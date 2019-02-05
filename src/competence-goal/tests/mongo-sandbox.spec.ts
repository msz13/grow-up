import {MongoClient} from 'mongodb'
import * as mquery  from 'mquery';
import { Query } from 'mongoose';


(async function() {
  // Connection URL
  const url = 'mongodb://test_admin:admin1@ds046037.mlab.com:46037/type_test';
  // Database Name
  const dbName = 'type_test';
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);
    console.log("Connection established")

    const collection = db.collection('post');
    
    class MyQuery {
       query: any = mquery(collection).find().toConstructor();
       find() {
        mquery(collection).find()
       }
    }
    const query = new MyQuery();
   // const query = mquery(collection).find().toConstructor();
    const result = await query.query().where('text').equals('Tekst 2');
    
    console.log(result)

    console.log(JSON.stringify(result,null,2));

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();