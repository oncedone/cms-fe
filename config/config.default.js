/**
 * config.default.js 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件。
 * 当指定 env 时会同时加载对应的配置文件，并覆盖默认配置文件的同名配置。如 prod 环境会加载 config.prod.js 和 config.default.js 文件，config.prod.js 会覆盖 config.default.js 的同名配置。
 */
module.exports = appInfo => {
  const config = {};
  //keys用于cookie加密需要手动修改
  config.keys = appInfo.name + '_1553605923956_3675';

  config.middleware = [];

  config.view = {
    mapping: {
      '.art': 'art'
    },
    cache: false,
    escape: false
  };

  const userConfig = {
  };
  
  return {
    ...config,
    ...userConfig,
  };
};
