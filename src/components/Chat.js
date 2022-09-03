import React, { useEffect, useState } from "react";
import "../css/Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Message from "./Message";
import { useChannelContext } from "../context/channel_context";
import db from "../firebase";
import { useGlobalContext } from "../context/user_context";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Chat = () => {
  const { channelId, channelName } = useChannelContext();
  const { user } = useGlobalContext();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          message: input,
          user: JSON.stringify(user),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat_messages">
        {messages.map((message) => {
          return (
            <Message
              timestamp={message.timestamp}
              message={message.message}
              user={message.user}
            />
          );
        })}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            type="submit"
            disabled={!channelId}
            className="chat__inputButton"
            onClick={sendMessage}
          >
            Send message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
