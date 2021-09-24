import { ObjectId } from 'mongodb';
import { ObjectIdParam } from '@server/shared/decorators/index';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VisualizationsService } from './visualizations.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CreateVisualizationObject } from './visualization.dto';

@ApiTags('Visualizations')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class VisualizationsController {

  constructor(
      private readonly visualizationsService: VisualizationsService) {

  }

  @Post('visualization')
  @ApiOperation({ summary: '创建可视化图表' })
  public async createVisualization(
      @Body() visualization: CreateVisualizationObject) {

    return await this.visualizationsService.createVisualization(visualization);
  }

  @Get('visualization/:id')
  @ApiOperation({ summary: '获取可视化图表列表' })
  public async getVisualization(
      @ObjectIdParam('id') id: ObjectId) {
    return await this.visualizationsService.getVisualization(id);
  }

  @Get('visualizations')
  @ApiOperation({ summary: '获取可视化图表列表' })
  public async getVisualizations() {
    return await this.visualizationsService.getVisualizations();
  }

}
