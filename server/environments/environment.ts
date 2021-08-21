// This file can be replaced during build by using the `fileReplacements` array.
// `npm run build:server` replaces `environment.ts` with `environment.prod.ts`.
import path from 'path';

export const environment = {
  production: false,
  webapp: {
    rootPath: path.join(__dirname, '../webapp'),
  },
};
