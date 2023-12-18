const mongoose =require("mongoose");
const connect=mongoose.connect("mongodb+srv://priyanshujha2707:priyanshu@cluster0.z88lljk.mongodb.net/?retryWrites=true&w=majority");
//check database connected or not
connect.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("database cannot be connected");
});
//create a schema
const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
});
//collection part
const collection=new mongoose.model("users",LoginSchema);
module.exports=collection;