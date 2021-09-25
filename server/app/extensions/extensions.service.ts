import fs from 'fs-extra';
import path from 'path';
import async from 'async';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ExtensionsService {

  constructor(
      @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {

  }

  public async getExtensions() {
    let extensions = await this.cacheManager.get<Array<any>>('extensions');
    if (extensions === undefined) {
      const apps = await async.filter(
        await fs.readdir(path.join(__dirname, '../../apps')),
        async (app) => {
          const stat = await fs.stat(path.join(__dirname, '../../apps', app));
          if (!stat.isDirectory()) {
            return false;
          }
          try {
            await fs.access(path.join(__dirname, '../../apps', app, 'extensions.json'), fs.constants.F_OK);
          } catch {
            return false;
          }
          return true;
        },
      );
      extensions = await Promise.all(
        apps.map(
          async (app) => {
            const json = await fs.readFile(path.join(__dirname, '../../apps', app, 'extensions.json'), { encoding: 'utf-8' });
            const extension = JSON.parse(json);
            return extension;
          },
        ),
      );
      await this.cacheManager.set('extensions', extensions);
    }
    return extensions;
  }

  public async getExtensionEntrypoint(id: string) {
    // let script = await this.cacheManager.get<string>(`extensions/${ id }`);
    let script: string | undefined = undefined;
    if (script === undefined) {
      const extensions = await this.getExtensions();
      const extension = extensions.find(extension => extension.id === id);
      if (!extension) {
        return;
      }
      script = await fs.readFile(path.join(__dirname, '../../apps', extension.id, extension.entrypoint), { encoding: 'utf-8' });
    }
    return script;
  }

}
