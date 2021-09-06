import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardsService } from './dashboards.service';
import { DashboardsController } from './dashboards.controller';
import { Dashboard, DashboardSchema } from './dashboard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dashboard.COLLECTION_NAME, schema: DashboardSchema }
    ]),
  ],
  providers: [
    DashboardsService,
  ],
  controllers: [
    DashboardsController,
  ],
})
export class DashboardsModule {

}
