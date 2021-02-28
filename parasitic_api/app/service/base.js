const {Service} = require('egg');
class BaseService extends Service{
    //pageNum=3,pageSize=3  6,3
   async select(pageNum,pageSize,sorter,where){
       //返回的是某一页的记录
     //select * from user where username='zhangsan' order by id desc,age asc limit 3,3;
     /* let list =  await this.app.mysql.select(this.entity,{
         where,
         orders:[['id','desc']],
         offset:(pageNum-1)*pageSize,//3
         limit:pageSize//3
     }); */
     let whereString = ' ';
     //let fields = Object.keys(where['filter']);//[username,email]
     if(where['filter']){
        let fields=JSON.parse(where['filter']); 
        for(let i=0;i<fields.length;i++){
             whereString += (`AND ${fields[i]} like '%${where[fields[i]]}%'`)
        }
     }
     
     let orderString = ' ' ,orderField='';
     //let orderField =  Object.keys(sorter);
     if(sorter){
        orderField=JSON.parse(sorter); 
     }
     

     if(orderField.length>0){

        orderString+='order by '
        
        for(let i=0;i<orderField.length;i++){
            
            let sc = 'asc,desc'.indexOf(sorter[orderField[i]])>-1?sorter[orderField[i]]:'asc';

            orderString += (` ${orderField[i]} '${sc}'`)
        }
     }

     let listSQL = `SELECT * FROM ${this.entity} where 1=1 ${whereString} ${orderString} limit ${(pageNum-1)*pageSize},${pageSize}`;
     let data = await this.app.mysql.query(listSQL);
     //按照条件过滤后的总条数
     //let total = await this.app.mysql.count(this.entity,where);
     let countSQL = `SELECT COUNT(*) total FROM ${this.entity} WHERE 1=1 ${whereString}`;
     let result =await this.app.mysql.query(countSQL);
     return {data,total:result[0].total};
   }
   async create(entity){
       //await this.app.mysql.query('select * from user');
       return await this.app.mysql.insert(this.entity,entity);
   }
   async update(entity){
       //update user set username=? where id =?
       return await this.app.mysql.update(this.entity,entity);
   }
   async destroy(ids){
       //delete from user where id=?
       return await this.app.mysql.delete(this.entity,{id:ids});
   }
}
module.exports = BaseService;