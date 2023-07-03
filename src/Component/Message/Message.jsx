import React from 'react'
import "./Message.css";

const Message = ({ user, message, classs }) => {

    if (user) {
        return (
            <div className={`messageBox ${classs} `}  >
                <p className={`flex justify-start text-sm text-purple-800  font-bold`}  >~{user}</p>
                <p className='text-slate-800'>{message}</p>
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                <p className='text-red-600 text-sm '>~You</p>
                {`${message}`}
            </div>
        )
    }
}

export default Message
