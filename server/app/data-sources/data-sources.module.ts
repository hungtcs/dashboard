import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSourcesService } from './data-sources.service';
import { DataSourcesController } from './data-sources.controller';
import { DataSource, DataSourceSchema } from './data-source.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataSource.name, schema: DataSourceSchema },
    ]),
  ],
  providers: [
    DataSourcesService,
  ],
  controllers: [
    DataSourcesController,
  ],
})
export class DataSourcesModule {

}
