import { APIBase } from '../../config/api.config';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('文章评论')
@Controller(APIBase + 'post')
export class PostCommentController {
  constructor() {}

  @Get()
  getAllPostComments(@Query() query) {}
}
