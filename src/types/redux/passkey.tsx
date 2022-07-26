import PasskeyAuthentication from "types/passkey/passKeyAuthentication";

interface InitialState {
  passkeyAuthenticationArray: PasskeyAuthentication[];
}
const UpdatePasskeysAction: string = "Update_PassKeys";

export default InitialState;
export { UpdatePasskeysAction };
