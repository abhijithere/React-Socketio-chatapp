import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Join.css";

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}
const Join = () => {

    const [name, setname] = useState("");
  return (
    <div className="JoinPage" >
    <div className="JoinContainer flex flex-col justify-center text-center items-center h-screen w-screen bg-[#1d1b1b35] ">
        <img src='./img/chat.png' alt="logo" className=' h-40 max-[280px]:h-28' />
        <h1 className='w-72 text-4xl p-6 border-b-4 max-[450px]:mb-5 max-[360px]:w-64 max-[360px]:text-3xl max-[280px]:w-40 max-[280px]:text-md'><span className=' text-green-300 '>ONLINE</span> CHAT</h1>
        <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" className='mt-10 w-96 p-6 caret-green-400 text-slate-600 max-[450px]:w-80 max-[360px]:w-64 max-[360px]:p-5 max-[280px]:w-48 max-[280px]:p-4'/>
        <Link  onClick={(e)=>!name?e.preventDefault():null} to="/chat">  <button onClick={sendUser}  className="joinbtn w-96 p-5 bg-green-400 border-[2px] border-green-400  text-slate-100 font-semibold text-2xl hover:bg-[#1d1b1b35] transition-all duration-500 max-[450px]:w-80 max-[360px]:w-64 max-[360px]:p-4 max-[280px]:w-48 max-[280px]:p-3">Login</button></Link>
    </div>
</div>
  )
}
export default Join
export {user}