import { commentModel } from "../../../Database/models/comment.model.js";

// * =================== GET ALL COMMENTS ===============================

export const getComments=async (req,res)=>{
    const comments=await commentModel.findAll()
    res.status(201).json({ message: 'sucess ',comments });
}

// * ==================  ADD COMMENT  =====================================

export const addComment=async (req,res)=>{
    const {content,userId,postId}=req.body;
    const comment=await commentModel.create({content,userId,postId});
    res.status(201).json({ message: 'Comment created successfully' ,comment});
}

// * ==================  DELETE COMMENT  =====================================

export const deleteComment=async (req,res)=>{
    const comment=await commentModel.destroy({where:{id:req.params.id}});
    if(!comment){
        return res.status(404).json({ message: 'Comment Not Found' });
    }
    res.status(201).json({ message: 'Comment deleted successfully' ,comment});

}

// * ==================  UPDATE COMMENT  =====================================

export const updateComment=async (req,res)=>{
    const {content,userId,postId}=req.body;
    const comment=await commentModel.update({content,userId,postId},{where:{id:req.params.id}});
    if(!comment[0]){
        return res.status(404).json({ message: 'Comment Not Found' });
    }
    res.status(201).json({ message: 'Comment updated successfully' ,comment});
}
