//todo:                                Facebook application using Sequelize

import sequelize from './Database/dbConnection.js'
import express from 'express'
import userRouter from './src/modules/users/user.routes.js';
import postRouter from './src/modules/posts/post.routes.js';
import commentRouter from './src/modules/comments/comment.routes.js';
import cors from "cors"
//  express
const app = express()
const port = process.env.port || 3000


app.use(express.json())


sequelize.sync({alter:false,drop:false}) 

//Routing
app.user(cors())
app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/comment",commentRouter)


app.get('/', (req, res) =>{
    res.status(201).json({message:"welcome on my project"})
})


app.use('*',(req,res)=>{
    res.status(404).json({message:"Not Found"})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



