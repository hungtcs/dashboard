import { Module } from '@nestjs/common';
import { WebappModule } from './webapp/webapp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardsModule } from './dashboards/dashboards.module';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { VisualizationsModule } from './visualizations/visualizations.module';

@Module({
  imports: [
    WebappModule,
    DashboardsModule,
    DataSourcesModule,
    VisualizationsModule,
    MongooseModule.forRoot(
      'mongodb://dashboard:dashboard@192.168.10.105/dashboard',
    ),
  ],
})
export class AppModule {

}
