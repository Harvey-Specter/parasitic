const {Service} = require('egg');
let BaseService = require('./base');
class OrgService extends BaseService{
  constructor(...args){
    
    super(...args);
    this.entity = 'org';
  }
}
module.exports = OrgService;