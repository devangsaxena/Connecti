const Post= require('../../../models/post');
const Comment= require('../../../models/comment');
module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        });

    return res.json(200,{
        message: "List of posts",
        posts : posts
    })
}

module.exports.destroy=async function(req,res){
    //req.params.id contains id of post to be deleted
    try{
        let post=await Post.findById(req.params.id);
            //post.user contains id of the user who posted that post.
            //req.user contains info of current logged in user.
            // .id means converting the object id into string.
            if(post.user==req.user.id){
                
                post.remove();
                
                await Comment.deleteMany({post:req.params.id});

                
    
                
                return res.json(200,{
                    message:"Posts and associated comments deleted"
                });
            
            }
            else{
                return res.json(401,{
                    message:"You cannot delete this post!"
                });
                
            
        }
    }
    catch(err){
       // req.flash('error',err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}