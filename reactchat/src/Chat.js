import React, {  useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({socket,username,room}){
    const [currentMessage,setCurrentMeassage]=useState("");
    const [messageList,setMessageList]=useState([]);
    const sendMessage=async ()=>{
        if(currentMessage!==""){
            const messageData={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),

            };
            await socket.emit("send_message",messageData);
            setMessageList((list)=>[...list,messageData]);
            setCurrentMeassage("");
        }
    };

    useEffect(()=>{
        socket.off("receive_message").on("receive_message",(data)=>{
            setMessageList((list)=>[...list,data]);
            
        });
        
    },[socket]);
    

    return (
        <div className="chat-window">
            <div className="chat-header"><p>Live Chat Room {room}</p></div>
            <div className="chat-body">
                <ScrollToBottom className="message-container"> 
                 {/* check for scroll bar */}
                {messageList.map((messageContent)=>{
                    return <div className="message" id={username===messageContent.author?"you":"other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                })}
                </ScrollToBottom>
            </div><br/>
            <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder="start typing..." onChange={(event)=>{setCurrentMeassage(event.target.value);
            }} onKeyPress={(event)=>{event.key==="Enter" && sendMessage();}}/>
                <br/><br/><button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}
export default Chat;