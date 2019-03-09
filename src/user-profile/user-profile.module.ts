import { Module } from '@nestjs/common';
import { UserDateTimeService } from './user-date-time.service/user-date-time.service';


@Module({
  providers: [UserDateTimeService],
  exports: [UserDateTimeService]
})
export class UserProfileModule {}
