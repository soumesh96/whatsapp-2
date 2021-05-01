import React from "react";
import { Button } from "@material-ui/core";

import { auth, provider } from "../../firebase";
import { Container, LogoContainer, Logo } from "./Elements";

const Login = () => {
  const signInHandler = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <LogoContainer>
        <Logo
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="noImg"
        />
        <Button onClick={signInHandler} variant="outlined">
          Sign in with Google
        </Button>
      </LogoContainer>
    </Container>
  );
};

export default Login;
