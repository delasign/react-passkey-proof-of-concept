import React, { useState } from "react";
import CreatePassKeyCredential from "utils/passkey/register/createPasskeyCredential";
import parseClientData from "utils/passkey/shared/parseClientData";
import validatePassKeyCreation from "utils/passkey/register/validatePassKeyCreation";
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
    console.log("✅ Created challengeBufferString : ", challengeBufferString);

    try {
      const credential = await CreatePassKeyCredential(
        username.toLowerCase(),
        displayName.toLowerCase(),
        challengeBufferString
      );

      console.log("✅ Created Pass Key Credential ! ");

      if (credential) {
        console.log("✅ Credential is not null : ", credential);
        // Validate PassKey Creation
        switch (validatePassKeyCreation(credential)) {
          case true:
            console.log("✅ PassKey verification passed.");
            break;
          case false:
            console.log("❌ PassKey verification failed.");
            break;
        }
        // @ts-ignore
        // Gather the client data.
        const clientData = parseClientData(credential.response.clientDataJSON);

        // Save the pass key data
        dispatch(
          updatePasskeys({
            id: credential.id,
            username: username,
            challengeBuffer: challengeBufferString,
            challenge: clientData.challenge,
          })
        );
        onRegister();
      } else {
        console.log("❌ Credential does not exist.");
      }
    } catch (error) {
      console.log("❌ Error creating credential");
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
