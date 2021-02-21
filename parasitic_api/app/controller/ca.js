const Controller = require('egg').Controller;
const BaseController = require('./base');
class CaController extends BaseController {
   constructor(...args){
     super(...args);
     this.entity = 'org_ca';
   }
}

module.exports = CaController;
