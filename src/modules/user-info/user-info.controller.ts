import { APIBase } from './../../config/api.config';
import { userInfoKeys } from './schema/user-info.schema';
import { FindUserInfoDto } from './dto/create-user-info.dto';
import { RoleType } from './../../config/auth.config';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PostContent, Roles } from 'src/utils';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('用户信息')
@Controller(APIBase + 'user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  @PostContent(['application/json'])
  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  update(@Body() updateUserInfoDto: UpdateUserInfoDto, @Req() req) {
    const id = req.user.userId;
    const data = {};
    userInfoKeys.forEach((key) => {
      if (updateUserInfoDto[key] != null) {
        data[key] = updateUserInfoDto[key];
      }
    });
    return this.userInfoService.update(id, data);
  }

  @Get()
  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  findAll(@Req() req, @Query() query?: FindUserInfoDto) {
    const id = req?.user?.userId;
    const params: { count?: number; userId?: string } = {};
    if (query.count) {
      params.count = query.count;
    } else if (id) {
      // 如果传了token，则返回自身的数据
      params.userId = id;
    }
    return this.userInfoService.findAll(params);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const userId = id || req.user.userId;
    return this.userInfoService.findOne(userId);
  }

  @Delete(':id')
  @Roles(RoleType.ADMIN)
  remove(@Param('id') id: string) {
    return this.userInfoService.remove(id);
  }
}
