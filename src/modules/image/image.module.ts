import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [AuthModule],
})
export class ImageModule {}
