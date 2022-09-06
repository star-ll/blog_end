import { CommentPostDto } from './dto/comment.dto';
import { PostCommentService } from './comment.service';
import { APIBase } from '../../config/api.config';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostContent, Roles } from 'src/utils';
import { RoleType } from 'src/config/auth.config';

@ApiTags('文章评论')
@Controller(APIBase + 'post_comment')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Get()
  getAllPostComments(@Query() query) {
    return this.postCommentService.getPostComments(query);
  }

  @Post()
  @PostContent()
  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  createPostComment(@Body() body: CommentPostDto, @Req() req) {
    const userId = req.user.userId;
    const params = { ...body, userId };

    return this.postCommentService.createPostComment(params);
  }
}
