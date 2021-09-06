import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSourcesService } from './data-sources.service';
import { DataSourcesController } from './data-sources.controller';
import { DataSource, DataSourceSchema } from './data-source.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataSource.COLLECTION_NAME, schema: DataSourceSchema },
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
