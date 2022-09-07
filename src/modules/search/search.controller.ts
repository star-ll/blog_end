import { SearchDto } from './dto/search.dto';
import { APIBase } from './../../config/api.config';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('搜索')
@Controller(APIBase + 'search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  getAllSearch(@Query() query: SearchDto) {
    return this.searchService.getSearch(query);
  }
}
