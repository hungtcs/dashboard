const path = require("path");
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
  console.log();
  return {
    ...options,
    mode: production ? 'production' : 'development',
    output: {
      path: path.join(__dirname, './dist/server'),
      filename: 'main.js',
    },
    resolve: {
      ...options.resolve,
      alias: getWebapckAlias(),
    }
  };
};
