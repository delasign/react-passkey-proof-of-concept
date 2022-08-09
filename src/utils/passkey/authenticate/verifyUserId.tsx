import React from "react";

const verifyUserId = (credential: Credential, userId: string): boolean => {
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

export default verifyUserId;
