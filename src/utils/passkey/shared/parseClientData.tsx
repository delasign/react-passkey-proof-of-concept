import PassKeyClientData from "types/passkey/passKeyClientData";

const parseClientData = (clientData: ArrayBuffer) => {
  // decode the clientDataJSON into a utf-8 string
  const utf8Decoder = new TextDecoder("utf-8");
  const decodedClientData = utf8Decoder.decode(clientData);

  // parse the string as an object
  const clientDataObj = JSON.parse(decodedClientData);
  return clientDataObj as PassKeyClientData;
};

export default parseClientData;
