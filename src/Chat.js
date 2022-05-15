import React, { useState, useRef, useEffect } from "react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, Avatar, SendButton, ConversationHeader, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import {akaneModel, eliotModel, emilyModel, joeModel, users} from "./data/data";
import { username, user } from './User';
import GUN from 'gun';
const db = GUN();

function Chat({username, room}) {
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);


  const handleSend = async message => {
    const secret = await GUN.SEA.encrypt(message, '#istanbulcerrahpasauniversity');
    const message2 = user.get('all').set({ what: secret });
    const index = new Date().toISOString();
    console.log(message2)
    db.get('chat-istanbul').get(index).put(message);
    console.log(message)
    setMessages([...messages, {
      message,
      direction: 'outgoing'
    }]);
    setMsgInputValue("");
    inputRef.current.focus();
  };

  useEffect(() => {

    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      '.': {
        // property selector
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    };

   // Get Messages
   db.get('chat-istanbul')
   .map(match)
   .once(async (data, id) => {
   // console.log("data is")
   // console.log(data.what)
     if (data) {
       // Key for end-to-end encryption
       const key = '#istanbulcerrahpasauniversity';
       var message2 = {
         // transform the data
         who: await db.user(data).get('alias'),
         what: await GUN.SEA.decrypt(data.what, key) + '', // force decrypt as text.
         when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
       };
       if (message2.what && message2.what !== 'undefined') {
          setMessages([...messages, {
          message: message2.what,
          direction: 'incoming',
          position: 'single',
          sentTime: message2.when
        }]);

            <Avatar src={emilyModel.avatar} name={"Emily"} />
       }
     }
   });
  });

  return (
    <div style={{
      height: "500px"
    }}>
      <MainContainer>
<ChatContainer>
                        <ConversationHeader>
                        <Avatar src={joeModel.avatar} name={"Zoe"}/>
                                <ConversationHeader.Content userName="Zoe" info="Room: 123" />        
                                </ConversationHeader>
                                
                        <MessageList>

                            {messages.map((m, i) => <Message key={i} model={m} />)}
                            <Message.Footer sentTime="şimdi" />
                        </MessageList>
                        
                        <div as={MessageInput} style={{
        display: "flex",
        flexDirection: "row",
        borderTop: "1px dashed #d1dbe4"
      }}>
                            <MessageInput ref={inputRef} onChange={msg => setMsgInputValue(msg)} value={msgInputValue} sendButton={false} attachButton={false} onSend={handleSend} style={{
          flexGrow: 1,
          borderTop: 0,
          flexShrink: "initial"
        }} />                                
                            <SendButton onClick={() => handleSend(msgInputValue)} disabled={msgInputValue.length === 0} style={{
          fontSize: "1.2em",
          marginLeft: 0,
          paddingLeft: "0.2em",
          paddingRight: "0.2em"
        }} />

                        </div>
                        </ChatContainer>     
                        </MainContainer>
        </div>
    )
}


export default Chat