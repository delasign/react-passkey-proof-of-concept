import PassKeyClientData from "types/passkey/passKeyClientData";
import parseClientData from "utils/passkey/shared/parseClientData";
import PassKeyClientDataValidation from "types/passkey/passKeyClientDataValidation";

const validatePassKeyCreation = (credential: Credential): string | null => {
  const clientDataValidation = validateClientData(credential);
  switch (clientDataValidation.valid) {
    case true:
      return clientDataValidation.challenge;
    case false:
      return null;
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

export default validatePassKeyCreation;
