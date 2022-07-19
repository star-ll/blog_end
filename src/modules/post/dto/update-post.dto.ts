import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreatePostDto } from './post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  content?: string;
  title?: string;
  author?: string;
}
