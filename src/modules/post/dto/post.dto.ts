import {
  IsDateString,
  IsDefined,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  userId?: string;
  @IsString()
  @IsDefined()
  title: string;
  @IsString()
  @IsDefined()
  author: string;
  @IsString()
  @IsDefined()
  content: string;
}

export class CreatePostResponseDto {
  title: string;

  author: string;

  createTime: Date;

  updateTime: Date;

  content: string;
}

export class FindAllPostDto {
  @IsNumberString()
  offset: number;
  @IsNumberString()
  limit: number;

  @IsString()
  author?: string;
  @IsString()
  'title'?: string;
  @IsDateString()
  'createTime'?: Date;
  @IsDateString()
  'updateTime'?: Date;
}
