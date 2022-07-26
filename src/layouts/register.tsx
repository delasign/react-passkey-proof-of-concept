import React, { useState } from "react";
import CreatePassKeyCredential from "utils/passkey/create/createPasskeyCredential";
import parseClientData from "utils/passkey/shared/parseClientData";
import { Container, SignInButton, Copy, UserName } from "components/shared";

import { useDispatch } from "react-redux";
import { updatePasskeys } from "redux-functionality/slices/passkeySlice";

import generateRandomString from "utils/generators/randomString";

interface Props {
  onRegister: () => void;
  onReturnToSignIn: () => void;
}

// markup
const Register = ({ onRegister, onReturnToSignIn }: Props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const onUserNameChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(ev.target.value);
  };

  const onDisplayNameChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(ev.target.value);
  };

  const createPassKey = async () => {
    const challengeBufferString = generateRandomString(8);
    try {
      const credential = await CreatePassKeyCredential(
        username.toLowerCase(),
        displayName.toLowerCase(),
        challengeBufferString
      );

      if (credential) {
        // @ts-ignore
        const clientData = parseClientData(credential.response.clientDataJSON);
        // Save the pass key data
        dispatch(
          updatePasskeys({
            username: username,
            challengeBufferString: challengeBufferString,
            challenge: clientData.challenge,
          })
        );
        onRegister();
      } else {
      }
    } catch (error) {
      // Session Timed Out
      console.log("ERROR : ", error);
    }
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
      <UserName
        placeholder={"What should we call you?"}
        type={"text"}
        value={displayName}
        onChange={onDisplayNameChanged}
      />
      <SignInButton onClick={createPassKey}> Register</SignInButton>
      <Copy>Already have an account ?</Copy>
      <SignInButton onClick={onReturnToSignIn}>Sign In</SignInButton>
    </Container>
  );
};

export default Register;
