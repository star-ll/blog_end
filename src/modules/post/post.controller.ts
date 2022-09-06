import { LikePostDto, ViewPostDto } from './dto/like.dto';
import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Query,
  Post,
  Patch,
  Req,
  Request,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { APIBase } from 'src/config/api.config';
import { RoleType } from 'src/config/auth.config';
import { PostContent, ResponseDto, Roles } from 'src/utils';
import { PostService } from './post.service';
import {
  CreatePostDto,
  CreatePostResponseDto,
  FindAllPostDto,
} from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('文章')
@Controller(APIBase + 'post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  @Post()
  @PostContent()
  @ApiOkResponse({
    type: ResponseDto,
  })
  create(@Body() CreatePostDto: CreatePostDto, @Req() req) {
    CreatePostDto.userId = req.user.userId;
    return this.postService.create(CreatePostDto);
  }

  // 增加文章浏览量
  @Get('/views')
  addViews(@Query() query: ViewPostDto) {
    console.log('hello');

    return this.postService.addViews(query);
  }

  // 获取文章列表
  @Get()
  @ApiOkResponse({
    type: [CreatePostResponseDto],
  })
  findAll(@Query() params: FindAllPostDto) {
    return this.postService.findAll(params);
  }

  // 获取文章详情
  @Get(':id')
  @ApiOkResponse({
    type: CreatePostResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  @Patch(':id')
  @PostContent()
  @ApiOkResponse({
    type: ResponseDto,
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  @Delete(':id')
  @ApiOkResponse({
    type: ResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  @Post('like')
  @PostContent()
  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  likePost(@Body() body: LikePostDto, @Req() req) {
    const userId = req.user.userId;

    return this.postService.likePost(userId, body);
  }
}
