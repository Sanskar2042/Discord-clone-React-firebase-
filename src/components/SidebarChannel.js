import React from "react";
import { useChannelContext } from "../context/channel_context";
import "../css/SidebarChannel.css";

const SidebarChannel = ({ id, channelName }) => {
  const { setChannelInfo } = useChannelContext();

  return (
    <div
      className="sidebarChannel"
      onClick={() => setChannelInfo(id, channelName)}
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
