import UserAccount from "types/passkey/userAccount";

interface InitialState {
  accounts: UserAccount[];
}
const UpdateUserAccountsAction: string = "Update_User_Accounts";

export default InitialState;
export { UpdateUserAccountsAction };
