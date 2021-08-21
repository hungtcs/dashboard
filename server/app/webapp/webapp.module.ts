import { Module } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { ServeStaticModule } from '@nestjs/serve-static';

const CONDITIONAL_MODULES = [];
if(environment.production) {
  CONDITIONAL_MODULES.push(
    ServeStaticModule.forRoot({
      rootPath: environment.webapp.rootPath,
      serveRoot: '',
      renderPath: /^(?!\/assets\/)/,
    }),
  );
}

@Module({
  imports: [
    ...CONDITIONAL_MODULES,
  ],
})
export class WebappModule {

}
