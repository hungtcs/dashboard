import { DataSource } from './data-source.schema';
import { DataSourcesService } from './data-sources.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

@ApiTags('DataSources')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class DataSourcesController {

  constructor(
      private readonly dataSourcesService: DataSourcesService) {

  }

  @Post('data-source')
  @ApiOperation({ summary: '创建数据源' })
  public async createDataSource(
      @Body() dataSource: DataSource) {
    return await this.dataSourcesService.createDataSource(dataSource);
  }

}
