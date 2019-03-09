import { Injectable } from '@nestjs/common';
import {ZonedDateTime, ZoneId} from 'js-joda';
import 'js-joda-timezone'

@Injectable()
export class UserDateTimeService {

    constructor(){
        this.userTimeZone='Europe/Warsaw';
    }

    userTimeZone: string;

    getUserDate(){
        return ZonedDateTime.now(ZoneId.of(this.userTimeZone)).toLocalDate();
    }

}
