import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import {DateStr} from '../types'
import { InvalidGraphQLRequestError } from 'apollo-server-core/dist/requestPipeline';

export function isDateStr(date: string): date is string {
 const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/
 if (!RFC_3339_REGEX.test(date)) {

    return false

  }

  // Verify the correct number of days for

  // the month contained in the date-string.

  const year = Number(date.substr(0, 4))

  const month = Number(date.substr(5, 2))

  const day = Number(date.substr(8, 2))

  const leapYear = (year: number): boolean => {

    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
  
  }

  switch (month) {

    case 2: // February

      if (leapYear(year) && day > 29) {

        return false

      } else if (!leapYear(year) && day > 28) {

        return false

      }

      return true

    case 4: // April

    case 6: // June

    case 9: // September

    case 11: // November

      if (day > 30) {

        return false

      }

      break

  }



  return true
} 


@Scalar('Date')
export class DateScalar {
  description = 'Date custom scalar type';

  parseValue(value) {
    if (isDateStr(value)) {
    return value; // value from the client
    } else throw InvalidGraphQLRequestError
  }

  serialize(value) {
    if (isDateStr(value)) {
      return value; // value from the client
      } else throw InvalidGraphQLRequestError 
  }

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if(isDateStr(ast.value)){
      return ast.value; // ast value is always in string format
    }
  }
    return null;
  }
}
