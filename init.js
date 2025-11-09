const mongoose=require("mongoose");
const chat=require("./models/chat.js");

main()
    .then(()=>{
        console.log("save ho gaya bhai");
    })
    .catch((err)=>{
        console.log("kuchhh dikkat hai bhai--",err)
    });

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats=[
    {
        from : "gaurav",
        to : "nitish",
        msg : "hello bhai..!",
        created_at : new Date()
    },
    {
        from : "ramesh",
        to : "suresh",
        msg : "send me notes",
        created_at : new Date()
    },
    {
        from : "papa",
        to : "me",
        msg : "good morning",
        created_at : new Date()
    },
    {
        from : "mummy",
        to : "me",
        msg : "sabji lete aana",
        created_at : new Date()
    },
]

chat.insertMany(allChats);

