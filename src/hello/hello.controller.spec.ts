import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';

describe('Hello Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HelloController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: HelloController = module.get<HelloController>(HelloController);
    expect(controller).toBeDefined();
  });
});
