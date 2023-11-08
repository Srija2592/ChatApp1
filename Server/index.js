const express=require('express');
const app=express();
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');

const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Srija@2592",
  database:"chatapp"
});

app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"],
    }
})
io.on("connection",(socket)=>{
    console.log(socket.id+" connected.");
    var sid=socket.id;


    socket.on("join_room",(data)=>{
        socket.join(data.room);
        console.log(`user with ID : ${socket.id} joined room ${data.room}`)
       
        
        
    })
    socket.on("join_room",(socket)=>{
        const room=socket.room;
        const username=socket.username;
        
        var sql = 'INSERT INTO `users` (`room`,`username`) VALUES (?,?)';
        if(room!=0){
            con.query(sql,[room,username]),function (err, result) {
            if (err) throw err;
            console.log("inserted row");
          };}
        
    })


    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
    })

    socket.on("send_message",(data)=>{
        console.log(data.message+"sending data......"+data.room);
        socket.to(data.room).emit("receive_message",data);
    })
})

server.listen(3001,()=>{
    console.log('server is running');
});


