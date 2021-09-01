import fs from 'fs-extra';
import path from 'path';
import async from 'async';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtensionsService {

  constructor() {

  }

  public async getExtensions() {
    const apps = await async.filter(
      await fs.readdir(path.join(__dirname, '../../apps')),
      async (app) => {
        const stat = await fs.stat(path.join(__dirname, '../../apps', app));
        if(!stat.isDirectory()) {
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
    const extensions = await Promise.all(
      apps.map(
        async (app) => {
          const json = await fs.readFile(path.join(__dirname, '../../apps', app, 'extensions.json'), { encoding: 'utf-8' });
          const extension = JSON.parse(json);
          return extension;
        },
      ),
    );
    return extensions;
  }

  public async getExtensionEntrypoint(id: string) {
    const extensions = await this.getExtensions();
    const extension = extensions.find(extension => extension.id === id);
    if(!extension) {
      return;
    }
    return await fs.readFile(path.join(__dirname, '../../apps', extension.id, extension.entrypoint), { encoding: 'utf-8' });
  }

}
