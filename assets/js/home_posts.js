{   
    //method to send the form data for new post using AJAX..
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            //submit button disabled by this statement..
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                //this converts data into json format i.e key value pairs
                data:newPostForm.serialize(),
                success:function(data){
                    //post here comes from the returned json data in create action 
                    let newPost=newPostDom(data.data.post);
                    //new post will come at the top now.. i.e prepend
                    $('#posts-list-container>ul').prepend(newPost);
                    /*passing the 'a' tag having class 'delete-post-button' from 
                    newpost function.
                    passing this 'a' tag to deletePost function*/
                    deletePost($(' .delete-post-button', newPost));
                    
                    
                    
                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Post Added!!!',
                        layout:'topRight',
                        timeout:1500


                    }).show();

                },error:function(error){
                    /*read-only XMLHttpRequest property responseText returns
                      text received from a server following a request being sent.
                    */ 
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    //post here comes from the returned json data in create action
    let newPostDom=function(post){
        //using backtick here
        return $(`
        <li id="post-${ post._id }" class="post-code">
        <section class="full-post">
            
            <p>
                
                        <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>
                        
                        ${post.content }
                                        <br>

                                        <small>
                                        ${ post.user.name }
                                        </small>
        </p>
            
            
        </section>    
        
            
        
            
        
            <div class="post-comments">
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id}">
                        <!-- here 'post' in 'post.comment' is the iterating  varible in the above for loop-->
                
                    </ul>
                </div>
             
         
        
                <form action="/comments/create" id="post-<%= post._id %>-comments-form" method="POST">
                    <input type="text" name="content" placeholder="Type here to add a comment..." required>
                       <!-- sending the id of the post below which comment needs to be added -->
                        <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add Comment">
        
                </form>
        
           
                
            </div>
        </li>`)
    
    }
    
    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error){
                    console.log(err.responseText);
                }
            })
        })
    }   


    
    createPost();

}