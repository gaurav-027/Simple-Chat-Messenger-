const express=require("express");
const app=express();
const path=require("path");
const chat=require("./models/chat.js");
const method_override=require("method-override");

app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(method_override("_method"));

const mongoose=require("mongoose");
main()
    .then(()=>{
        console.log("mil gaya bhai");
    })
    .catch((err)=>{
        console.log("kuchhh dikkat hai bhai--",err)
    });

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.get("/",(req,res)=>{
    res.send("Hello Buddy");
})

app.get('/chats',async(req,res)=>{
    let chats=await chat.find();
    res.render("index.ejs",{chats});
})

app.get('/chats/new',(req,res)=>{
    res.render("new.ejs")
})

app.post('/chats',(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat= new chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    })
    newChat.save();
    res.redirect('/chats');
})

app.get('/chats/:id/edit',async(req,res)=>{
    let {id}=req.params;
    let chats=await chat.findById(id);
    res.render("edit.ejs",{chats});
})

app.put('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    let updatedChat=await chat.findByIdAndUpdate(id,{msg : msg});
    res.redirect('/chats');
})

app.delete('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await chat.findByIdAndDelete(id);
    res.redirect('/chats');
})

app.listen(8080,()=>{
    console.log("Chalu hai bhai 👍🏻");
})