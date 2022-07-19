import { Injectable } from '@nestjs/common';

@Injectable()
export class DocsService {
  getDocs() {
    return 'docs';
  }
}
