const Controller = require('egg').Controller;
const BaseController = require('./base');
class CaController extends BaseController {
   constructor(...args){
     super(...args);
     this.entity = 'ca';
   }
}

module.exports = CaController;
