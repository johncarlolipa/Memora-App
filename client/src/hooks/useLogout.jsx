import { useAuthContext } from "./useAuthContext";
// import { useQuoteContext } from "./useQuoteContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
//   const { dispatch: quoteDispatch } = useQuoteContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    // quoteDispatch({ type: "SET_QUOTES", payload: null });
  };
  return { logout };
};