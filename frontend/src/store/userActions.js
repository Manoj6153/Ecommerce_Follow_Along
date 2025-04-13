import { setEmail } from "./store";

export const updateEmail = (email) => (dispatch) => {
  dispatch(setEmail(email));
};

