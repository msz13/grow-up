import { ObjectID } from "mongodb";
import { getMonth, format, addDays, addWeeks, setDay } from "date-fns";
import { LocalDate, DayOfWeek, TemporalAdjuster, IsoFields, ChronoField, TemporalAdjusters, ZonedDateTime, ZoneId } from "js-joda";
import { isDateStr } from "./scalars/date.scalar";
import {parse} from 'date-fns'
import moment = require("moment");
import {convertToTimeZone, formatToTimeZone} from 'date-fns-timezone'
import 'js-joda-timezone'

const arrSize = 280;

const createArr = (value: any)=> {
    let arr = []
    for (let i = 1; i <= arrSize; i++ ) {
        arr.push(value)
    }
    return arr;
}

const counter = 30
let saturday: any  
console.time('Moment test')
for (let i=0; i<=counter; i++) {
  const dateStr = moment().format('YYYY-MM-DD')
  saturday = moment(dateStr).add(1, 'w').day(6).format('YYYY-MM-DD')
}
console.timeEnd('Moment test')
console.log('moment: '+saturday)

let saturday2: any
console.time('fns-date')
  
for (let i=0; i<=counter; i++) {
  const dateStr = format(new Date(), 'YYYY-MM-DD' )
  const nextWeek = addWeeks(dateStr,1)
  const saturdayDate=setDay(nextWeek, 6)
  saturday2 = format(saturdayDate,'YYYY-MM-DD')
}
console.timeEnd('fns-date')
console.log('fns-date: '+ saturday2)


let saturday3: any
console.time('js-joda')
  
for (let i=0; i<=counter; i++) {
  const dateStr = LocalDate.now().toString()
  
  saturday3=LocalDate.parse(dateStr).plusWeeks(1).with(TemporalAdjusters.next(DayOfWeek.SATURDAY))
    
}
console.timeEnd('js-joda')
console.log('js-joda: '+saturday3)

const timezone = 'Pacific/Kiritimati' 

let saturday4: any
console.time('js-joda time-zone')
  
for (let i=0; i<=counter; i++) {
  const date = ZonedDateTime.now(ZoneId.of(timezone))
  saturday4=date.toString()
  
    
}
console.timeEnd('js-joda time-zone')
console.log('js-joda: '+saturday4)


let saturday5: any
console.time('fns-date time-zone')
  
for (let i=0; i<=counter; i++) {
  const date = convertToTimeZone(Date.now(), {timeZone: timezone})
  saturday5=date.toLocaleString('PL', {timeZone: timezone})
     
}
console.timeEnd('fns-date time-zone')
console.log('fns-date timezone: '+saturday5)

let saturday6: any
console.time('fns-date time-zone')
  
for (let i=0; i<=counter; i++) {
  const date = formatToTimeZone(Date.now(), 'YYYY-MM-DDTHH:mm Z z',{timeZone: timezone})
  saturday6=date
     
}
console.timeEnd('fns-date time-zone')
console.log('fns-date format to timezone: '+saturday6)

const eId = new ObjectID("5c8d63e5ec787960cca88db2")
console.log(eId)