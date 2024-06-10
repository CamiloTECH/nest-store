import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const parseVale = parseInt(value);
    if (isNaN(parseVale)) {
      throw new BadRequestException(`${value} is not a number`);
    }
    return parseVale;
  }
}
