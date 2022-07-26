import React, { useState } from "react";
import styled from "styled-components";
import { Container, SignInButton, Copy, UserName } from "components/shared";
import getPasskeyCredential from "utils/passkey/authenticate/getPasskeyCredential";
import parseClientData from "utils/passkey/shared/parseClientData";
import PasskeyAuthentication from "types/passkey/passKeyAuthentication";

import store, { RootState } from "redux-functionality/index";
import { useSelector } from "react-redux";
interface Props {
  onRegister: () => void;
  onSignIn: () => void;
}

// markup
const Landing = ({ onRegister, onSignIn }: Props) => {
  const [username, setUsername] = useState<string>("");

  const passkeyAuthenticationArray: Array<PasskeyAuthentication> = useSelector(
    (state: RootState) => state.passKey.passkeyAuthenticationArray
  );

  const onUserNameChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(ev.target.value);
  };

  const signIn = async () => {
    // Get the challenge
    const passkey = getPassKey();
    if (passkey !== null) {
      console.log("✅ There is a match for that username!");
      // Gather the client data from the passkey using the challenge
      const clientData = await performLogin(passkey.challengeBufferString);
      if (clientData !== null) {
        console.log("✅ We have performed the login.");
        console.log("⚈ ⚈ ⚈ Verifying Challenge ⚈ ⚈ ⚈");
        switch (validatePassKey(passkey.challenge, clientData.challenge)) {
          case true:
            console.log("✅ You have succesfully logged in.");
            onSignIn();
            break;
          case false:
            console.log("❌ The challenge does not match.");
            break;
        }
      } else {
        console.log("❌ Failed to perform Login.");
      }
    } else {
      console.log("❌ There is no match for that username");
    }
  };

  const getPassKey = () => {
    if (passkeyAuthenticationArray === undefined) {
      return null;
    }

    const match = passkeyAuthenticationArray.filter(
      (item) => item.username.toLowerCase() === username.toLowerCase()
    );

    if (match.length > 0) {
      return match[0];
    } else {
      return null;
    }
  };

  const performLogin = async (challengeBufferString: string) => {
    try {
      const credential = await getPasskeyCredential(challengeBufferString);
      // @ts-ignore
      return parseClientData(credential.response.clientDataJSON);
    } catch (error) {
      console.log("Error : ", error);
      return null;
    }
  };

  const validatePassKey = (
    storedChallenge: string,
    clientChallenge: string
  ) => {
    return storedChallenge === clientChallenge;
  };

  return (
    <Container>
      <UserName
        placeholder={"Please enter your email"}
        type={"text"}
        autoComplete={"username webauthn"}
        value={username}
        onChange={onUserNameChanged}
      />
      <SignInButton onClick={signIn}> Sign In</SignInButton>
      <Copy>Not Created an Account ?</Copy>
      <SignInButton onClick={onRegister}>Register</SignInButton>
    </Container>
  );
};

export default Landing;
