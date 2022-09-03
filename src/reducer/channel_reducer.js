const channel_reducer = (state, action) => {
  if (action.type === "SET_CHANNEL") {
    const { id, channelName } = action.payload;

    return { ...state, channelId: id, channelName: channelName };
  }

  return { ...state };
};

export default channel_reducer;
