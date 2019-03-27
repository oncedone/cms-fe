'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('home.art', { title: 'demo page', body: 'hi, egg' });
  }
}

module.exports = HomeController;
