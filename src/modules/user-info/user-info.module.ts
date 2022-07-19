import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService],
  imports: [AuthModule],
})
export class UserInfoModule {}
