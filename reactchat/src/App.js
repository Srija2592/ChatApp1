import io from 'socket.io-client';
import './App.css';
import Chat from './Chat';
import { useState } from 'react';
const socket=io.connect('http://localhost:3001');
function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showChat,setShowChat]=useState(false);
  const joinRoom=()=>{
    if(username!=="" && room!==""){
      socket.emit("join_room",room);
      setShowChat(true);
    }
  }
  return (
    <div className="App">
      {!showChat ?(
    
      <div className='joinChatContainer'>
      <h2>Join a Chat</h2>
      Enter your Name : <input type="text" onChange={(event)=>{
        setUsername(event.target.value)
      }}/><br/><br/>
      Enter your Room Id : <input type="text" onChange={(event)=>{
        setRoom(event.target.value)
      }}/><br/><br/>
      <button onClick={joinRoom}>Join A Room</button>
      </div>):
      (<Chat socket={socket} username={username} room={room}/>)}
    </div>
  );
}

export default App;
