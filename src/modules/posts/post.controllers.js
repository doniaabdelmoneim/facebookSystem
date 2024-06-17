import { commentModel } from "../../../Database/models/comment.model.js";
import { postModel } from "../../../Database/models/post.model.js";
import { userModel } from "../../../Database/models/user.model.js";

// * =================== GET ALL POSTS ===============================
export const getPost=async (req,res)=>{
    const posts=await postModel.findAll()
    res.status(201).json({ message: 'sucess ',posts });
}

// * ==================  ADD POST  =====================================
export const addPost=async (req,res)=>{
    const {title,content,userId}=req.body;
    const post=await postModel.create({title,content,userId});
    res.status(201).json({ message: 'Post created successfully' ,post});
}
// * ==================  UPDATE POST  =====================================

export const updatePost=async (req,res)=>{
    const {title,content,userId}=req.body;
    const post=await postModel.update({title,content,userId},{where:{id:req.params.id}});
    if(!post[0]){
        return res.status(404).json({ message: 'user Not Found' });
}
    res.status(201).json({ message: 'Post updated successfully' ,post});
}

// * ==================  DELETE POST  =====================================

export const deletePost=async (req,res)=>{
    const post=await postModel.destroy({where:{id:req.params.id}});
    if(!post){
        return res.status(404).json({ message: 'Post Not Found' });
    }
    res.status(201).json({ message: 'Post deleted successfully' ,post});
}
// * ==================  GET POST WITH USER & COMMENT  =====================================

export const getPostById=async (req,res)=>{
    const {id}=req.params;
    const post=await postModel.findOne({where:{id},
        attributes:['id',"title","content"],
        include:{
        model:userModel,
        attributes:['id','username'],
        include:{
                model:commentModel,
                attributes:['content']
        }
    }})
    if(!post){
        return res.status(404).json({ message: 'Post Not Found' });
    }
    res.status(201).json({ message: 'Post found successfully' ,post});
}
