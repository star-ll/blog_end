import {
  IsArray,
  IsMobilePhone,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserInfoDto {
  @IsString()
  name: string;

  @IsArray()
  tag?: string[];

  @IsString()
  @MaxLength(300)
  introduce?: string;

  @IsMobilePhone('any')
  phone?: string;

  @IsUrl()
  avatar?: string;
}

export class FindUserInfoDto {
  @IsString()
  count?: number;
}
