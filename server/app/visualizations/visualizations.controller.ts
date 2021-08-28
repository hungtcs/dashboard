import { Visualization } from './visualization.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VisualizationsService } from './visualizations.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

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
      @Body() visualization: Visualization) {

    return await this.visualizationsService.createVisualization(visualization);
  }

  @Get('visualizations')
  @ApiOperation({ summary: '获取可视化图表列表' })
  public async getVisualizations() {
    return await this.visualizationsService.getVisualizations();
  }

}
