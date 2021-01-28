const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/connecti_development');
const db=mongoose.connection;
 db.on('error',console.error.bind(console,"Error Connection to MongoDB"));
//mongoose.connect('mongodb+srv://sonu:sonu@free-cluster-t4e4s.mongodb.net/Todo?retryWrites=true&w=majority');
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});
module.exports=db;