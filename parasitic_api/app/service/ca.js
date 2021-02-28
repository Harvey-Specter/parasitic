const {Service} = require('egg');
let BaseService = require('./base');
class CaService extends BaseService{
  constructor(...args){
    
    super(...args);
    this.entity = 'org_ca';
  }
}
module.exports = CaService;