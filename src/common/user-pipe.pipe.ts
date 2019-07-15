import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value: '+JSON.stringify(value))
    console.log('metadana: '+JSON.stringify(metadata))
    return value;
  }
}
