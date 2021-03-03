const Controller = require('egg').Controller;
const BaseController = require('./base');
class CaUserController extends BaseController {
   constructor(...args){
     super(...args);
     this.entity = 'caUser';
   }
   async index() {
    const { ctx ,service} = this;
    //let {pageNum,pageSize,...where} =  ctx.query;
    let {current, pageSize, sorter, ca_id, ...filter} =  ctx.query;
    let currentPageNum = isNaN(current)?1:parseInt(current);
    let currentPageSize = isNaN(pageSize)?1000:parseInt(pageSize);
    let result = await service[this.entity].select(currentPageNum,currentPageSize,sorter,filter,ca_id);
    this.success(result);
  }
}
module.exports = CaUserController;
