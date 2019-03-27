'use strict';

/**
 * 用于配置 URL 路由规则，具体参见 Router  https://eggjs.org/zh-cn/basics/router.html。
 */

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};

