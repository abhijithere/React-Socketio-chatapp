import React, { useEffect, useState } from 'react'
import {user} from '../Join/Join'
import SocketIO from 'socket.io-client'
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import Message from '../Message/Message';

let socket ;
const ENDPOINT ='https://chatapp-nodejs-backend.onrender.com/';


const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])
    const send=()=>{
        
      const message = document.getElementById('chatInput').value;
      if(!message){
        return;
      }
      socket.emit('message',{message,id});
      document.getElementById('chatInput').value="";
    }

    useEffect(() => {
        socket= SocketIO(ENDPOINT, {transports:['websocket']});

        socket.on('connect',()=>{
            alert('connected');
            setid(socket.id)
        })
         
        socket.emit('joined',{user})

        socket.on("welcome",(data)=>{
            setMessages([...messages, data]);
              console.log(data.user,data.message)
        })

        socket.on('userjoined',(data)=>{
            setMessages([...messages, data]);
            console.log(data.user,data.message)
        })
        socket.on('leave',(data)=>{
            setMessages([...messages, data]);
            console.log(data.user,data.message)
        })

        return () => {
            socket.on("disconnect");
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage',(data)=>{
            setMessages([...messages, data]);
            console.log(data.user,data.message,data.id)
           
        })
        return () => {
            socket.off();
        };
    }, [messages]);


  return (
    <div className="chatPage">
            <div className="chatContainer h-[620px] w-[70%] max-[800px]:h-screen max-[800px]:w-screen ">
                <div className="header h-20 bg-teal-700 flex justify-between items-center px-14 max-[470px]:px-6">
                    <h2 className='text-white text-3xl  font-semibold max-[300px]:text-2xl'>Online<span className=' text-violet-300'> Chat</span></h2>
                    <a href="/" className='cursor-pointer h-12 w-12 rounded-full flex justify-center items-center hover:bg-[#0000002c]'> <img src='/img/close.png' alt="Close"  className='h-5 '/></a>
                </div>
                <ReactScrollToBottom className="chatBox h-[74%] max-[600px]:h-[79%] max-[470px]:h-[80%] max-[800px]:h-[80%]">
                {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message}   classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox flex justify-center  items-center  ">
                    <input placeholder='Type your message...' onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" className='h-16 w-[80%] rounded-full outline-none px-10 caret-emerald-400 text-lg text-slate-600 max-[470px]:w-[90%] max-[470px]:h-14 ' />
                    <button onClick={send} className="sendBtn absolute ml-[50%]  max-[600px]:ml-[65%] max-[800px]:ml-[70%]"><img src='/img/send.png' alt="Send" className='h-6 '/></button>
                </div>
            </div>
            </div>
  )
}

export default Chat
