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

  @Get()
  @ApiOkResponse({
    type: [CreatePostResponseDto],
  })
  findAll(@Query() params: FindAllPostDto) {
    return this.postService.findAll(params);
  }

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
}
