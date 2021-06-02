import './App.css';
import Sidebar from './Sidebar';
import Chatbox from './Chatbox';
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';
import { useState } from 'react';

function App() {

  const [messages ,setmessages] = useState([]);

  useEffect(function () {
      axios.get("/messages/sync")
      .then(function (response) {
        setmessages(response.data)
      })
  },[]); 

  useEffect(function () {
    const pusher = new Pusher('4dc4775876482b646ba2', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      setmessages([...messages,data]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };

  },[messages]);

  console.log(messages);

  return (
    <div className="App">
      <div className="side">
      <Sidebar/>
      </div>
      <div className="chat">
      <Chatbox messages={messages}/>
      </div>
    </div>
  );
}

export default App;
