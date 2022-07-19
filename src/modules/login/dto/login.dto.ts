// import { RoleType } from '../../../config/auth.config';
import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';

enum RoleType {
  GENERAL_USER = '用户',
  ADMIN = '管理员',
}

export class LoginDto {
  @IsEmail()
  @IsDefined()
  email: string;
  @IsString()
  @IsDefined()
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsEnum(RoleType)
  @IsDefined()
  role: RoleType;
}
