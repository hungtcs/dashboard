import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WebappModule } from './webapp/webapp.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    WebappModule,
  ],
  providers: [
    AppService,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {

}
