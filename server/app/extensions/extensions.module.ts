import { Module } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '../../apps'),
    //   serveRoot: '/api/extensions/static',
    //   renderPath: '^',
    // }),
  ],
  providers: [
    ExtensionsService,
  ],
  controllers: [
    ExtensionsController,
  ],
})
export class ExtensionsModule {

}
