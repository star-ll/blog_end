import { userInfoModal } from './../user-info/schema/user-info.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginModel } from './schema/users.schema';
import { ResponseJSON } from 'src/utils/response';

@Injectable()
export class LoginService {
  private readonly loginModel = LoginModel;
  private readonly userInfoModal = userInfoModal;

  constructor(private jwtService: JwtService) {}

  valid(email, password?: string) {
    const query: { email: string; password?: string } = { email };
    if (password) query.password = password;
    return this.loginModel.findOne(query);
  }

  async login(body) {
    const findUser = this.valid(body.email, body.password);
    return findUser
      .then((res) => {
        return new ResponseJSON({
          token: this.jwtService.sign({ role: res.role, userId: res._id }),
          role: res.role,
        });
      })
      .catch((err) => {
        throw new HttpException('账号密码错误', 401);
      });
  }

  async register(body) {
    return this.valid(body.email)
      .then(async (res) => {
        if (res == null) {
          const user = await this.loginModel.create({
            email: body.email,
            password: body.password,
            role: body.role,
          });
          console.log(user);

          const userInfo = await this.userInfoModal.create({
            _id: user._id,
            email: body.email,
          });
        } else {
          throw new HttpException('该邮箱已被注册', HttpStatus.FORBIDDEN);
        }
      })
      .then(() => {
        return new ResponseJSON(null, '注册成功');
      });
  }
}
