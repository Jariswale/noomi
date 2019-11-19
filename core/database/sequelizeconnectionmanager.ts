import {Sequelize as SequelizeOrigin} from 'sequelize';
import { Sequelize } from "sequelize-typescript";
import { TransactionManager } from "./transactionmanager";

/**
 * 连接管理器
 */
class SequelizeConnectionManager{
    sequelize:Sequelize;
    connection:any;
    options:object;
    dbMdl:any;
    usePool:boolean;
    poolAlias:string;       //pool别名
    constructor(cfg){
        //使用cli-hooked
        // sequelize-typescript不支持cls，要用sequelize
        SequelizeOrigin.useCLS(TransactionManager.namespace);
        //处理models路径
        if(cfg.models && Array.isArray(cfg.models)){
            cfg.models.forEach((item,i)=>{
                if(typeof item === 'string'){
                    cfg.models[i] = process.cwd() + item;
                }
            });
        }
        
        this.sequelize = new Sequelize(cfg);
    }

    /**
     * 获取连接
     */
    async getConnection(){
        return this.sequelize;
    }

    /**
     * 释放连接
     * @param conn 
     */
    async release(conn?:any){
    }
}


export{SequelizeConnectionManager}