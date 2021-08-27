import { Controller, Post } from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('DataSources')
@Controller()
export class DataSourcesController {

  constructor(
      private readonly dataSourcesService: DataSourcesService) {

  }

  @Post('data-source')
  @ApiOperation({ summary: '创建数据源' })
  public createDataSource() {

  }

}
