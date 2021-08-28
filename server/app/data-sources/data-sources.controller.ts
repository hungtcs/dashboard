import { DataSource } from './data-source.schema';
import { DataSourcesService } from './data-sources.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DataSourcesQueryObject } from './data-source.dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';

@ApiTags('DataSources')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class DataSourcesController {

  constructor(
      private readonly dataSourcesService: DataSourcesService) {

  }

  @Get('data-sources')
  @ApiOperation({ summary: '获取数据源列表' })
  public async getDataSources(
      @Query() query: DataSourcesQueryObject) {
    return {
      data: await this.dataSourcesService.getDataSources(query),
      count: await this.dataSourcesService.getDataSourcesCount(query),
    };
  }

  @Post('data-source')
  @ApiOperation({ summary: '创建数据源' })
  public async createDataSource(
      @Body() dataSource: DataSource) {
    return await this.dataSourcesService.createDataSource(dataSource);
  }

  @Get('data-source/query')
  public async queryDataFromDataSource(
      @Query('type') type: string,
      @Query('collection') collection: string,
      @Query('dataSourceId') dataSourceId: string) {
    return await this.dataSourcesService.queryDataFromDataSource(type, collection, dataSourceId);
  }

}
