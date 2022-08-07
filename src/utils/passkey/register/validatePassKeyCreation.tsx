import PassKeyClientData from "types/passkey/passKeyClientData";
import parseClientData from "utils/passkey/shared/parseClientData";
import PassKeyClientDataValidation from "types/passkey/passKeyClientDataValidation";
// @ts-ignore
import CBOR from "cbor-js";

const validatePassKeyCreation = (credential: Credential): boolean => {
  const clientDataValidation = validateClientData(credential);
  switch (clientDataValidation.valid) {
    case true:
      validateAuthenticationData(credential);
      return true;
    case false:
      return false;
  }
};

const validateClientData = (
  credential: Credential
): PassKeyClientDataValidation => {
  // @ts-ignore
  // Gather the Client Data
  const clientData = parseClientData(credential.response.clientDataJSON);
  console.log("✅  Gathered Client Data: ", clientData);
  if (clientData.origin !== process.env.REACT_APP_ORIGIN) {
    console.log("❌  Origin does not match!");
    return {
      valid: false,
      challenge: null,
    };
  } else if (clientData.type !== "webauthn.create") {
    console.log("❌  Type does not match webauthn.create");
    return {
      valid: false,
      challenge: null,
    };
  }
  console.log("✅  Client Data is Valid");
  return {
    valid: true,
    challenge: clientData.challenge,
  };
};

const validateAuthenticationData = (credential: Credential) => {
  // Gather and decode the Attestation Object
  //@ts-ignore
  const attestationObject = credential.response.attestationObject;
  console.log("✅  Gathered Attestation Object: ", attestationObject);
  const decodedAttestationObject = CBOR.decode(attestationObject);
  console.log("✅  Decoded Attestation Object: ", decodedAttestationObject);

  // Gather and parse the authentication data
  // @ts-ignore
  const authData = decodedAttestationObject.authData;

  // get the length of the credential ID
  const dataView = new DataView(new ArrayBuffer(2));
  const idLenBytes = authData.slice(53, 55);
  // @ts-ignore
  idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
  // @ts-ignore
  const credentialIdLength = dataView.getUint16();

  // get the credential ID
  const credentialId = authData.slice(55, 55 + credentialIdLength);
  console.log("✅  credentialId: ", credentialId);

  // get the public key object
  const publicKeyBytes = authData.slice(55 + credentialIdLength);
  console.log("✅  publicKeyBytes: ", publicKeyBytes);
  // the publicKeyBytes are encoded again as CBOR
  const publicKeyObject = CBOR.decode(publicKeyBytes.buffer);
  console.log("✅  publicKeyObject: ", publicKeyObject);
};

export default validatePassKeyCreation;
