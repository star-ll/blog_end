import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsModule } from './modules/docs/docs.module';
import { ImageModule } from './modules/image/image.module';
import { LoginModule } from './modules/login/login.module';
import { PostModule } from './modules/post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoModule } from './modules/user-info/user-info.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/myblog'),
    DocsModule,
    ImageModule,
    LoginModule,
    PostModule,
    UserInfoModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
