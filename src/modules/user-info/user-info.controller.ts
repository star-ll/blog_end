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
@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  @PostContent()
  @Roles(RoleType.ADMIN, RoleType.GENERAL_USER)
  update(@Body() updateUserInfoDto: UpdateUserInfoDto, @Req() req) {
    const id = req.user.userId;
    return this.userInfoService.update(id, updateUserInfoDto);
  }

  @Get()
  findAll(@Query() query?: FindUserInfoDto) {
    console.log(query);

    return this.userInfoService.findAll(query?.count);
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
