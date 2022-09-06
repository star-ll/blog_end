import { IsNumberString, IsString } from 'class-validator';

export class CommentPostDto {
  @IsString()
  postId: string;

  @IsString()
  content: string;
}

export class getCommentDto {
  @IsString()
  postId: string;

  @IsNumberString()
  offset: number;

  @IsNumberString()
  limit: number;
}
