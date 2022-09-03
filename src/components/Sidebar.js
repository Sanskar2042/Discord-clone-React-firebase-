import React, { useState, useEffect } from "react";
import "../css/Sidebar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SidebarChannel from "./SidebarChannel";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar } from "@mui/material";
import { useGlobalContext } from "../context/user_context";
import { signOut } from "@firebase/auth";
import db, { auth, provider } from "../firebase";

const Sidebar = () => {
  const { user, setUser } = useGlobalContext();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            channel: doc.data(),
          };
        })
      );
    });
  }, []);

  const signout = () => {
    signOut(auth, provider);
    setUser(null);
    localStorage.setItem("user", null);
  };

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      db.collection("channels").add({
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Papercut's Discord</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channel</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelList">
          {channels.map(({ id, channel }) => {
            return (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            );
          })}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__cellularIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <div>
          <article onClick={signout} className="sidebar_profileLogout">
            Sign Out
          </article>
          <Avatar className="sidebar__profilePhoto" src={user.photoURL} />
        </div>
        <div className="sidebar__profileInfo">
          <h3>@{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadphonesIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
