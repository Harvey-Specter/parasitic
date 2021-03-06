const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data){
    this.ctx.body = {success:true, ...data}
  }
  error(error){
    this.ctx.body = {success:false,error}
  }
  //支持查询和分页
  async index() {
    const { ctx ,service} = this;
    //let {pageNum,pageSize,...where} =  ctx.query;
    let {current, pageSize, sorter, ...filter} =  ctx.query;
    let currentPageNum = isNaN(current)?1:parseInt(current);
    let currentPageSize = isNaN(pageSize)?1000:parseInt(pageSize);
    let result = await service[this.entity].select(currentPageNum,currentPageSize,sorter,filter);
    this.success(result);
  }
  async create(){
    const {ctx,app,service} = this;
    let user = ctx.request.body;//{username,password,email}
    let result = await service[this.entity].create(user);
    result.affectedRows>0?this.success(''):this.error('创建失败');
  }
  async update(){
    const {ctx,app,service} = this;
    let id = ctx.params.id;
    let user = ctx.request.body;//{username,password,email}
    user.id = id;
    let result = await service[this.entity].update(user);
    result.affectedRows>0?this.success(''):this.error('更新失败');
  }
  async destroy(){
    const {ctx,app,service} = this;
    let id = ctx.params.id;
    let ids = ctx.request.body;
    if(!ids){
        ids=[id]
    }
    let result = await service[this.entity].destroy(ids);
    result.affectedRows>0?this.success(''):this.error('删除失败');
  }
}

module.exports = BaseController;
