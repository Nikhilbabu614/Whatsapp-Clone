//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

//app config
const app = express();
const pusher = new Pusher({
    appId: "1213196",
    key: "4dc4775876482b646ba2",
    secret: "dada4732d17bf5733ef8",
    cluster: "ap2",
    useTLS: true
});

const db = mongoose.connection;

db.once("open",function () {
    console.log("DB is connected");
    const messageCollection = db.collection("messagecontents")
    const changeStream = messageCollection.watch()

    changeStream.on("change",function (change) {
        console.log("A change :",change);

        if(change.operationType == "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",{
                name: messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                recieved:messageDetails.recieved,
            });
        }else{
            console.log("error triggering pusher");
        }
    });

});


//middleware
app.use(express.json());

app.use(function (req,res,next) {
    res.setHeader("Access-Control-Allow-Origin","*");   //you can aslo use cors -- npm i cors
    res.setHeader("Access-Control-Allow-Headers","*");
    next();    
})

//MongoDB config
mongoose.connect('mongodb+srv://nikhilbabu614:Nikhil123@cluster0.qcevi.mongodb.net/whatsappDB?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true } )

//????

//api route
app.get("/",function (req,res) {
    res.send("hello world");
})

app.post("/messages/new",function (req,res) {
    const postdata = req.body;

    Messages.create(postdata,function (err,data) {
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
})

app.get("/messages/sync",function (req,res) {
    Messages.find(function (err,data) {
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    })
})

//listen
app.listen(process.env.PORT || 9000,function () {
    console.log("server strated at port : 9000")
})