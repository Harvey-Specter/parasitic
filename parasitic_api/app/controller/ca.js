const Controller = require('egg').Controller;
const BaseController = require('./base');
class CaController extends BaseController {
   constructor(...args){
     super(...args);
     this.entity = 'ca';
   }

   async getCaUser(){
    const {app,service,ctx} = this;
    const body = ctx.request.body;
    console.log('getCaUser controller==',body)
    let result = await service.ca.getCaUser(body);
    this.success(result);
  }
  //设置用户角色的关系，就是把角色和用户进行关联
  async setCaUser(){
    const {app,service,ctx} = this;
    const body = ctx.request.body;//{roleId=1,userIds:[1,2]}
    let result = await service.ca.setCaUser(body);
    result?this.success('为角色分配用户成功'):this.success('为角色分配资源失败');
  }
}

module.exports = CaController;
