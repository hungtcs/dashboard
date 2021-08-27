import { Module } from '@nestjs/common';
import { WebappModule } from './webapp/webapp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSourcesModule } from './data-sources/data-sources.module';

@Module({
  imports: [
    WebappModule,
    DataSourcesModule,
    MongooseModule.forRoot(
      'mongodb://dashboard:dashboard@192.168.10.105/dashboard',
    ),
  ],
})
export class AppModule {

}
