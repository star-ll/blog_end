import { IsDateString, IsDefined, IsString } from 'class-validator';

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
  @IsString()
  author?: string;
  @IsString()
  'title'?: string;
  @IsDateString()
  'createTime'?: Date;
  @IsDateString()
  'updateTime'?: Date;
}
