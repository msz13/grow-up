import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as os from 'os'

declare const module: any;



async function bootstrap() {
  const  app = await NestFactory.create(ApplicationModule);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);

  console.log(os.cpus.length)
  
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
