import { Module } from '@nestjs/common';
import { WebappModule } from './webapp/webapp.module';
import { DataSourcesModule } from './data-sources/data-sources.module';

@Module({
  imports: [
    WebappModule,
    DataSourcesModule,
  ],
})
export class AppModule {

}
