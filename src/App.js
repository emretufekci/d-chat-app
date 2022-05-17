import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Chat from './Chat';
import GUN from 'gun';
import { user } from './User';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showChat, setShowChat] = useState(false);
  const db = GUN();
  
  const login = () => {
    if (username !== "" && password !== "") {
      user.auth(username, password, ({ err })  => {
        if (err) {
          alert(err);
          console.log("if" + err);
        } else {
          console.log("else" + err);
          setShowChat(true);
        }
      });
    }
  };

  function register() {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Giriş Yap</h3>
          <input
            type="text"
            placeholder="Ali.."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Parola..."
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={login}>Giriş Yap</button>
          <button onClick={register}>Üye Ol</button>
          
        </div>
      ) : (<Chat/>)}
    </div>
  );
}

export default App;
