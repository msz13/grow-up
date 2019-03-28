import { Injectable } from '@nestjs/common';
import {ZonedDateTime, ZoneId} from 'js-joda';
import 'js-joda-timezone'
import { convertToTimeZone } from 'date-fns-timezone';

@Injectable()
export class UserDateTimeService {

    constructor(){
        this.userTimeZone='Europe/Warsaw';
    }

    userTimeZone: string;

    getUserDate(){
        return convertToTimeZone(Date.now(), {timeZone: this.userTimeZone})
        //return ZonedDateTime.now(ZoneId.of(this.userTimeZone)).toLocalDate();
    }

}
