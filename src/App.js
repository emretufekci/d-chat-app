import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Chat from './Chat';
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      setShowChat(true);
    }
  };

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
        </div>
      ) : (<Chat/>)}
    </div>
  );
}

export default App;
