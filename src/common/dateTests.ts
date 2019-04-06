import { ObjectID } from "mongodb";
import { getMonth, format, addDays, addWeeks, setDay } from "date-fns";
import { isDateStr } from "./scalars/date.scalar";
import {parse} from 'date-fns'
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


let saturday5: any
console.time('fns-date time-zone')

const timezone = 'Europe/Warsaw'
  
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