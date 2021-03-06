const {Service} = require('egg');
let BaseService = require('./base');
class PeerService extends BaseService{
  constructor(...args){
    
    super(...args);
    this.entity = 'peer';
  }
}
module.exports = PeerService;