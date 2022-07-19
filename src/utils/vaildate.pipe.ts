import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class validRequest implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // console.log(value, metatype);

    const object = plainToClass(metatype, value);
    console.log('参数：', value);

    const errors = await validate(object, {
      skipMissingProperties: true,
      forbidUnknownValues: true,
    });
    console.log(errors);
    let errorMessage = '';
    errors.forEach((item) => {
      Object.keys(item.constraints).forEach((key) => {
        const msg = item.constraints[key];
        errorMessage += `${key}: ${msg};\n`;
      });
    });

    if (errors.length > 0) {
      throw new HttpException(
        errorMessage || '参数错误',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
