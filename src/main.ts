import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
//import * as fs from 'fs'


declare const module: any;



async function bootstrap() {
  const  app = await NestFactory.create(ApplicationModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(3000);

  //console.log('opened socet file: '+fs.openSync('/tmp/app-initialized', 'w'));
  
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
