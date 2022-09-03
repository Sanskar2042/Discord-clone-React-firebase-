import React from "react";
import "../css/Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";
import { useGlobalContext } from "../context/user_context";

const Login = () => {
  const { setUser } = useGlobalContext();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          setUser(result.user);
          localStorage.setItem("user", JSON.stringify(result.user));
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://cdn.logojoy.com/wp-content/uploads/20210422095037/discord-mascot.png"
            alt=""
          />
        </div>
        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
};

export default Login;
