import { Connection, Entity, Column, createConnection, MongoRepository } from "typeorm";
import {Dog, Cat} from './classes'
   

    let connection: Connection;
    let dogRepository: MongoRepository<Dog>;
    let catRepository: MongoRepository<Cat>

    createConnection({
    "type": "mongodb",
    "url": "mongodb://grow-up:grow-up1@ds161112.mlab.com:61112/grow-up", 
    "synchronize": true,
    "logging": true,
    "entities": [
     // "/**/**.entity{.ts,.js}"
     Dog, Cat
    ]} ).then(async connection => {
      console.log("connection created")

      dogRepository = connection.getMongoRepository(Dog);
      catRepository = connection.getMongoRepository(Cat)

      const dog = dogRepository.create()
  dog.name = "Burek"
  dog.buda = "Ladna"
  try {dogRepository.insertOne(dog)
  console.dir(dog)
} catch(e) {console.error(e)}

  const cat = new Cat ()
  cat.name = "Kiciu"
  cat.kuweta = "śmierdącaz"
  try { catRepository.insertOne(cat)}
  catch(e) {console.error(e)}

  try { const animals = await dogRepository.createEntityCursor().toArray()
    console.log('fatched animals')
  console.dir(animals)} 
  catch(e) {console.error(e)}

 connection.close()

    },error =>  console.error(error))
    
   
  
    

  


  


