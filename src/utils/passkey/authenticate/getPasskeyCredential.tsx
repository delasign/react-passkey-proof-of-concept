const getPasskeyCredential = async (challengeBufferString: string) => {
  const challengeBuffer = Uint8Array.from(challengeBufferString, (c) =>
    c.charCodeAt(0)
  );
  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge: challengeBuffer,
    rpId: process.env.REACT_APP_RP_DOMAIN,
    timeout: 60000,
  };

  return await navigator.credentials.get({
    publicKey: publicKeyCredentialRequestOptions,
  });
};

export default getPasskeyCredential;
