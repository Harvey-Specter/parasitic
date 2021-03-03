const {Service} = require('egg');
let BaseService = require('./base');
class CaUserService extends BaseService{
  constructor(...args){
    
    super(...args);
    this.entity = 'ca';
  }
  async getCaUser(body){
    const {app,service,ctx} = this;
    const {caId} = body;
    //let role_resources = await this.app.mysql.select('role_resource',{where:{role_id:role.id}});

    let result = await app.mysql.select('ca_user',{where:{ca_id: caId }});
    return result;
  }
  async setCaUser(body){//{roleId:1,userIds:[2,3]}

    const {app,service,ctx} = this;
    const {roleId,userIds} = body;
    const conn = await app.mysql.beginTransaction();
    let success=true;
    try{
      //await conn.query(`DELETE FROM role_user WHERE role_id = ?`,[roleId]);//删除此角色关系的所有用户
      for(let i=0;i<userIds.length;i++){
        await conn.insert('role_user',{'role_id':roleId,'user_id':userIds[i]});
      }
      await conn.commit();
    }catch(error){
      await conn.rollback();
      success =false;
    }
    return success;
  }
}
module.exports = CaUserService;