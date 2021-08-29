import { Dashboard } from './dashboard.schema';
import { DashboardsService } from './dashboards.service';
import { DashboardCreateObject, WidgetSaveObject } from './dashboard.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ObjectIdParam } from '@server/shared/decorators';
import { ObjectId } from 'mongodb';

@ApiTags('Dashboards')
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class DashboardsController {

  constructor(
      private readonly dashboardsService: DashboardsService) {

  }

  @Get('dashboards')
  @ApiResponse({ type: Dashboard })
  @ApiOperation({ summary: '获取Dashboard列表' })
  public async getDashboards() {
    return await this.dashboardsService.getDashboards();
  }

  @Post('dashboard')
  @ApiOperation({ summary: '创建Dashboard' })
  public async createDashboard(
      @Body() object: DashboardCreateObject) {
    return await this.dashboardsService.createDashboard(object);
  }

  @Get('dashboard/:id/widgets')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: '获取Dashboard组件' })
  public async getDashboardWidgets(
      @ObjectIdParam('id') id: ObjectId) {
    return await this.dashboardsService.getDashboardWidgets(id);
  }

  @Put('dashboard/:id/widgets')
  @ApiOperation({ summary: '设置Dashboard组件' })
  public async setDashboardWidgets(
      @ObjectIdParam('id') id: ObjectId,
      @Body() widgets: Array<WidgetSaveObject>) {
    await this.dashboardsService.setDashboardWidgets(id, widgets);
  }


}
