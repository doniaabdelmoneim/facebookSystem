import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import { commentModel } from './comment.model.js';
export const postModel=sequelize.define('post',{
    title:{
        type:DataTypes.STRING(100)
    },
    content:{
        type:DataTypes.STRING(100)
    }
})
//Relation bet postModel and commentModel

postModel.hasMany(commentModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
commentModel.belongsTo(postModel)

