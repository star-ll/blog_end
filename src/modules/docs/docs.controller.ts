import { Controller, Get, UseFilters } from '@nestjs/common';
import { Roles } from '../../utils/index';
import { APIBase } from '../../config/api.config';
import { RoleType } from '../../config/auth.config';
import { DocsService } from './docs.service';

// @Roles(RoleType.GENERAL_USER, RoleType.ADMIN)

@Controller(APIBase + 'docs')
export class DocsController {
  constructor(private docsService: DocsService) {}

  @Get()
  getDocs() {
    return 'docs';
  }
}
