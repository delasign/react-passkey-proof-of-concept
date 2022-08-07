import React, { useState } from "react";
import styled from "styled-components";
import { Container, SignInButton, Copy, UserName } from "components/shared";
import getPasskeyCredential from "utils/passkey/authenticate/getPasskeyCredential";
import parseClientData from "utils/passkey/shared/parseClientData";
import PasskeyAuthentication from "types/passkey/passKeyAuthentication";

import store, { RootState } from "redux-functionality/index";
import { useSelector } from "react-redux";

// @ts-ignore
import CBOR from "cbor-js";

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
    console.log("⚈ ⚈ ⚈ signIn ⚈ ⚈ ⚈");
    // Get the challenge
    const passkey = getPassKey();
    console.log("⚈ ⚈ ⚈ getPassKey ⚈ ⚈ ⚈");
    if (passkey !== null) {
      console.log(
        "Get PassKey ✅ There is a match for that username : ",
        passkey
      );
      //Gather the client data from the passkey using the challenge
      const credential = await performLogin(passkey.challengeBuffer);

      if (credential !== null) {
        switch (verifyUserId(credential, passkey.id)) {
          case true:
            verifyClientData(credential, passkey);
            break;
          case false:
            break;
        }
      } else {
        console.log(
          " signIn ❌ Failed to perform Login as credential does not exist."
        );
      }
    } else {
      console.log(" signIn ❌ There is no match for that username.");
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

  const performLogin = async (challenge: string) => {
    console.log("⚈ ⚈ ⚈ performLogin ⚈ ⚈ ⚈");
    try {
      const credential = await getPasskeyCredential(challenge);
      console.log(" performLogin ✅ credential : ", credential);
      return credential;
    } catch (error) {
      console.log(
        "performLogin ❌  Failed to get credential with error : ",
        error
      );
      return null;
    }
  };

  const verifyUserId = (credential: Credential, userId: string) => {
    console.log("⚈ ⚈ ⚈ Verifying UserId ⚈ ⚈ ⚈");
    const utf8Decoder = new TextDecoder("utf-8");

    const decodedUserHandle = utf8Decoder.decode(
      // @ts-ignore
      credential.response.userHandle
    );
    console.log("✅ decodedUserHandle : ", decodedUserHandle);

    if (decodedUserHandle !== userId) {
      console.log("❌ The userId does not match. Failed Login.");
      return false;
    } else {
      console.log("✅  Verified UserId");
      // @ts-ignore
      return true;
    }
  };

  const verifyClientData = (
    credential: Credential,
    passkey: PasskeyAuthentication
  ) => {
    //@ts-ignore
    let clientData = parseClientData(credential.response.clientDataJSON);
    if (clientData !== null) {
      console.log("✅ We have performed the login.");
      console.log("✅ clientData : ", clientData);
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
