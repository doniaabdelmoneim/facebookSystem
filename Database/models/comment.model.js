import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
export const commentModel=sequelize.define('comment',{
    content:{
        type:DataTypes.STRING(500)
    }
})
