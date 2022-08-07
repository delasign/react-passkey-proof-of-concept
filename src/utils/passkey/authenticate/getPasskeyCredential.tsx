import PasskeyAuthentication from "types/passkey/passKeyAuthentication";
import generateRandomString from "utils/generators/randomString";

const getPasskeyCredential = async (
  challenge: string,
  credentialId: string
) => {
  const challengeBuffer = Uint8Array.from(challenge, (c) => c.charCodeAt(0));
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
