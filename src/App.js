import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Chat from './Chat';
import GUN from 'gun';
import { user } from './User';

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const db = GUN();
  
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      user.auth(username, room, ({ err }) => err && alert(err));
      setShowChat(true);
    }
  };

  function createRoom() {
    user.create(username, room, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        joinRoom();
      }
    });
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Sohbete Katıl</h3>
          <input
            type="text"
            placeholder="Ali.."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Oda Numarası..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Sohbete Katıl</button>
          <button onClick={createRoom}>Oda Kur</button>

        </div>
      ) : (<Chat/>)}
    </div>
  );
}

export default App;
