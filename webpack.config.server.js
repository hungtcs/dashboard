const path = require("path");
const webpack = require("webpack");
const nestConfig = require('./nest-cli.json');

const production = process.env.NODE_ENV === 'production';

function getWebapckAlias() {
  /**
   * @type {Record<String, string>}
   */
  const alias = {};
  if(production) {
    const fileReplacements = nestConfig.compilerOptions?.production?.fileReplacements ?? [];
    return fileReplacements.reduce(
      (alias, { replace, with: _with }) => {
        alias[path.join(__dirname, replace)] = path.join(__dirname, _with);
        return alias;
      },
      alias,
    );
  } else {
    return alias;
  }
}

/**
 *
 * @param {import('webpack').Configuration} options
 * @returns {import('webpack').Configuration}
 */
module.exports = function(options) {
  return {
    ...options,
    mode: production ? 'production' : 'development',
    output: {
      path: path.join(__dirname, './dist/server'),
      filename: 'main.js',
    },
    // plugins: [
    //   ...options.plugins,
    //   new webpack.IgnorePlugin({
    //     checkResource(resource) {
    //       const lazyImports = [
    //         '@nestjs/microservices',
    //         'cache-manager',
    //         'class-validator',
    //         'class-transformer',
    //         '@nestjs/websockets/socket-module',
    //         '@nestjs/microservices/microservices-module',
    //         'class-transformer/storage',
    //         'fastify-static',
    //         'fastify-swagger',
    //       ];
    //       if (!lazyImports.includes(resource)) {
    //         return false;
    //       }
    //       try {
    //         require.resolve(resource, {
    //           paths: [process.cwd()],
    //         });
    //       } catch (err) {
    //         return true;
    //       }
    //       return false;
    //     },
    //   }),
    // ],
    resolve: {
      ...options.resolve,
      alias: getWebapckAlias(),
    },
    // externals: [],
  };
};
