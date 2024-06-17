import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import { postModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";
export const userModel=sequelize.define('user',{
    username:{
        type:DataTypes.STRING(100)
    },
    email:{
        type:DataTypes.STRING(100)
    },
    password:{
        type:DataTypes.STRING(100)
    }
});


//Relation bet postModel and userModel
userModel.hasMany(postModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
postModel.belongsTo(userModel)


//Relation bet commentModel and userModel
userModel.hasMany(commentModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE' 
})
commentModel.belongsTo(userModel)