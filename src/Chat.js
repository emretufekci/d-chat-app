import React, {useSelector, useState, useRef, useEffect } from "react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, Avatar, SendButton, ConversationHeader, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import {akaneModel, eliotModel, emilyModel, joeModel, users} from "./data/data";
import { gunUsername, user } from './User';
import GUN from 'gun';
const db = GUN();

function Chat({username, password}) {
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([])

 
  useEffect(() => {
    var match = {'.': {'>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(),},'-': 1,};
   // Get Messages
   db.get('chat-istanbul')
   .map(match)
   .once(async (data, id) => {

   if (data) {
       // Key for end-to-end encryption
       const key = '#istanbulcerrahpasauniversity';
       var message2 = {
         // transform the data
         who: await db.user(data).get('alias'),
         what: await GUN.SEA.decrypt(data.what, key) + '', // force decrypt as text.
         when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
       };

       if (message2.what && message2.what !== 'undefined' && message2.who != gunUsername) {
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
  }, []);

  const handleSend = async message => {

    /**
     * We encrypt the message with the key.
     * The key is a secret shared between the sender and the receiver.
     * The key is used to encrypt the message.
     * The key is used to decrypt the message.
     * The key is used to sign the message.
     * The key is used to verify the message.
     * AND MOST IMPORTANT THING!!!
     * message2 is the encrypted message. that's why we're putting it into the database.
     * message is just sending message without encryption we can pass it to react.
     */

    const secret = await GUN.SEA.encrypt(message, '#istanbulcerrahpasauniversity');
    const message2 = user.get('all').set({ what: secret });
    const index = new Date().toISOString();
    console.log("giden mesaj: ", message);

    db.get('chat-istanbul').get(index).put(message2);
    
    setMessages([...messages, {
      message: message,
      direction: 'outgoing'
    }]);
    setMsgInputValue("");
    message = '';
    inputRef.current.focus();
  };
  

  return (
    <div style={{
      height: "500px"
    }}>
      <MainContainer>
<ChatContainer>
                        <ConversationHeader>
                        <Avatar src={joeModel.avatar} name={"Zoe"}/>
                                <ConversationHeader.Content userName={gunUsername} info="Oda: 'chat-istanbul'" />        
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