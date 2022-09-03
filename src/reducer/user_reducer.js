const user_reducer = (state, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  return { ...state };
};

export default user_reducer;
