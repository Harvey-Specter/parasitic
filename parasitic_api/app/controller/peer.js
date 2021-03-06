const Controller = require('egg').Controller;
const BaseController = require('./base');
class OrgController extends BaseController {
   constructor(...args){
     super(...args);
     this.entity = 'org';
   }
}

module.exports = OrgController;
