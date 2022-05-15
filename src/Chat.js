import React, { useState, useRef } from "react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, Avatar, SendButton, AttachmentButton, InfoButton, ConversationHeader, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import {akaneModel, eliotModel, emilyModel, joeModel, users} from "./data/data";

function Chat({username, room}) {
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = message => {
    setMessages([...messages, {
      message,
      direction: 'outgoing'
    }]);
    setMsgInputValue("");
    inputRef.current.focus();
  };

  return (
    <div style={{
      height: "500px"
    }}>
<ChatContainer>
                        <ConversationHeader>
                        <Avatar src={joeModel.avatar} name={"Zoe"}/>
                                <ConversationHeader.Content userName="Zoe" info="Room: 123" />        
                                </ConversationHeader>
                                
                        <MessageList>
                        <Message model={{
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Emily",
        direction: "incoming",
        position: "single"
      }}>
            <Avatar src={emilyModel.avatar} name={"Emily"} />
          </Message>
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
        </div>
    )
}


export default Chat