import InitialState, {
  UpdateUserAccountsAction,
} from "types/redux/userAccount";
import PasskeyAuthentication from "types/passkey/userAccount";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  accounts: [],
};

export const userAccountsSlice = createSlice({
  name: UpdateUserAccountsAction,
  initialState: initialState,
  reducers: {
    addUserAccount: (state, action: PayloadAction<PasskeyAuthentication>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      var userAccounts = state.accounts;
      userAccounts.push(action.payload);
      state.accounts = userAccounts;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserAccount } = userAccountsSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default userAccountsSlice.reducer;
