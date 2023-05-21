import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "onboard":
      return { ...state, isOnboardingCompleted: true };
    case "logout":
      return { ...state, isOnboardingCompleted: false };
    default:
      return state;
  }
};

const onboard = (dispatch) => {
  return () => {
    dispatch({ type: "onboard" });
  };
};

const logout = (dispatch) => {
  return () => {
    dispatch({ type: "logout" });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { onboard, logout },
  { isOnboardingCompleted: false }
);
