import { Test, TestingModule } from '@nestjs/testing';
import { UserDateTimeService } from './user-date-time.service';

describe('UserDateTime.ServiceService', () => {
  let service: UserDateTimeService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDateTimeService],
    }).compile();
    service = module.get<UserDateTimeService>(UserDateTimeService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  console.log(service.getUserDate().toString())
});
