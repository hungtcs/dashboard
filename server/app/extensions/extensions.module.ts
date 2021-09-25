import { CacheModule, Module } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';

@Module({
  imports: [
    CacheModule.register(),
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
