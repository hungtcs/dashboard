import { Module } from '@nestjs/common';
import { DataSourcesController } from './data-sources.controller';
import { DataSourcesService } from './data-sources.service';

@Module({
  providers: [
    DataSourcesService,
  ],
  controllers: [
    DataSourcesController,
  ],
})
export class DataSourcesModule {

}
