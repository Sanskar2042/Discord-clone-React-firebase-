import React, { useReducer } from "react";
import { useContext } from "react";
import reducer from "../reducer/user_reducer";

const UserContext = React.createContext();

const getUser = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return null;
  }
};

const initialState = {
  user: getUser(),
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(UserContext);
};
