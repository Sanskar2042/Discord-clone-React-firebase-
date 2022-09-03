import React from "react";
import "../css/Message.css";
import { Avatar } from "@mui/material";

const Message = ({ timestamp, user, message }) => {
  return (
    <div className="message">
      <Avatar src={JSON.parse(user).photoURL} />
      <div className="message__info">
        <h4>
          {JSON.parse(user).displayName}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
