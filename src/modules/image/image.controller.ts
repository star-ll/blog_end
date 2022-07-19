import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { ResponseJSON } from 'src/utils';
import { APIBase } from '../../config/api.config';
import { imageCacheTime } from '../../config/cache.config';
import { FetchImageDto } from './dto/fetch-image.dto';
import { FileUploadDto } from './dto/file-update.dto';
import { ImageService } from './image.service';

const IMAGE_SIZE = 10 * 1024 * 1024;

@Controller(APIBase + 'image')
@ApiTags('图片')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':imagePath')
  fetchImage(@Param() param: FetchImageDto, @Res() res) {
    res
      .set('cache-control', `public, max-age=${imageCacheTime}`)
      .sendFile(join(__dirname, '../../../public/images/' + param.imagePath));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '图片文件',
    type: FileUploadDto,
  })
  update(@UploadedFile() file: Express.Multer.File) {
    const reg = /^image/;
    if (!reg.test(file.mimetype)) {
      throw new HttpException('只接受图片文件', HttpStatus.FORBIDDEN);
    }
    if (file.size > IMAGE_SIZE) {
      throw new HttpException('图片不能大于10MB', HttpStatus.FORBIDDEN);
    }
    try {
      this.imageService.saveImage(file);
      return new ResponseJSON(true);
    } catch {
      throw new HttpException('上传失败', 500);
    }
  }
}
