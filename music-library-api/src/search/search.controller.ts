import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('')
  async search(@Query('query') query: string) {
    const rs = await this.searchService.search(query);
    return {
      data: rs,
    };
  }

  @Get('/v2/')
  async searchV2(@Query('query') query: string) {
    const rs = await this.searchService.searchV2(query);
    return {
      data: rs,
    };
  }
}
