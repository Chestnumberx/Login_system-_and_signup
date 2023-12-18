const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const collection=require("./config");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup",async(req,res)=>{
    const data={
        name: req.body.username,
        password: req.body.password
    }
  
const existuser=await collection.findOne({name:data.name});
    

if(existuser){
    res.send("user already exist.please choose different username");
}else{
    //hash the password using bcrypt
    const saltRounds=10;
    const hashpassword=await bcrypt.hash(data.password,saltRounds);

    data.password=hashpassword;
    const userdata=await collection.insertMany(data);
    console.log(userdata);
}
    
});

//Login
app.post("/login",async(req,res)=>{
try{
    const check=await collection.findOne({name:req.body.username});
    if(!check){
        res.send("user name cannot found");
    }
    const ispassmatch=await bcrypt.compare(req.body.password,check.password);
    if(ispassmatch){
        res.render("home");
    }
    else{
        res.send("wrong password");
    }
}
catch{
    res.send("wrong details");
}
});



const port=5000;
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})

