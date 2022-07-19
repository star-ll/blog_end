import { Injectable } from '@nestjs/common';
import { join } from 'path';
('path');
import { createWriteStream } from 'fs';

@Injectable()
export class ImageService {
  async saveImage(file) {
    const fileStream = await createWriteStream(
      join(__dirname, '../../../public/images/' + file.originalname),
    );
    await fileStream.write(file.buffer);
  }
}
