import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APIBase } from 'src/config/api.config';
import { PostContent } from 'src/utils';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('登录')
@Controller(APIBase + 'user')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @PostContent()
  login(@Body() body: LoginDto) {
    return this.loginService.login(body);
  }

  @Post('register')
  @PostContent()
  register(@Body() body: RegisterDto) {
    return this.loginService.register(body);
  }
}
