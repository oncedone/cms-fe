'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    console.log(this.config.env);
    await ctx.render('home.art', { title: 'demo page', body: 'hi, egg' });
  }
}

module.exports = HomeController;
