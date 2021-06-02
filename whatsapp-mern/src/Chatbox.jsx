import React, { useState } from 'react';
import './Chatbox.css';
import { Avatar } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodSharpIcon from '@material-ui/icons/MoodSharp';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import axios from './axios';

function Chatbox({ messages }) {

    const [input, setinput] = useState("");

    const click= async (event) => {
        event.preventDefault();

        await axios.post("/messages/new", {
            message: input,
            name: "you",
            timestamp: "justnow",
            recieved: false
        });

        setinput("");
    };


    return (
        <div className="chatbox">
            <div className="chatbox_header">
                <div className="chatbox_header_left">
                    <Avatar />
                    <h2>Goutham</h2>
                </div>
                <div className="chatbox_header_right">
                    <AttachFileIcon />
                    <MoreVertIcon />
                </div>
            </div>


            <div className="chatbox_body">
                {messages.map((message) => (
                    <div className={`messagecss ${!message.recieved && 'reciever'}`} >
                        <p>
                            <span className="chatname">{message.name}</span>
                            {message.message}
                            <span className="timestamp">{message.timestamp}</span>
                        </p>
                    </div>
                ))}

            </div>


            <div className="chatbox_footer">
                <MoodSharpIcon />
                <form>
                    <input type="text" value={input} onChange={e => setinput(e.target.value)} />
                    <button type="submit" onClick={click} ><SendOutlinedIcon /></button>
                </form>
                <MicNoneOutlinedIcon />
            </div>
        </div>
    );
}

export default Chatbox;