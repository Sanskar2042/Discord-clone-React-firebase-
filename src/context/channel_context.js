import React, { useContext, useReducer } from "react";
import reducer from "../reducer/channel_reducer";

const ChannelContext = React.createContext();

const initialState = {
  channelId: "",
  channelName: "",
};

export const ChannelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setChannelInfo = (id, channelName) => {
    dispatch({ type: "SET_CHANNEL", payload: { id, channelName } });
  };

  return (
    <ChannelContext.Provider value={{ ...state, setChannelInfo }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelContext = () => {
  return useContext(ChannelContext);
};
