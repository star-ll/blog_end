import { PostCommentService } from './comment.service';
import { PostCommentController } from './comment.controller';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PostController, PostCommentController],
  providers: [PostService, PostCommentService],
})
export class PostModule {}
