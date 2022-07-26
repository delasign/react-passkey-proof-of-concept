import InitialState, { UpdatePasskeysAction } from "types/redux/passkey";
import PasskeyAuthentication from "types/passkey/passKeyAuthentication";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  passkeyAuthenticationArray: [],
};

export const passkeySlice = createSlice({
  name: UpdatePasskeysAction,
  initialState: initialState,
  reducers: {
    updatePasskeys: (state, action: PayloadAction<PasskeyAuthentication>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      var passkeys = state.passkeyAuthenticationArray;
      passkeys.push(action.payload);
      state.passkeyAuthenticationArray = passkeys;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePasskeys } = passkeySlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default passkeySlice.reducer;
