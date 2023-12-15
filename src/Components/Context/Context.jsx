import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const MovieContext = createContext();

const Context = ({ children }) => {
  const [cookie, setCookie] = useCookies()
  const [login, setLogin] = useState(() => cookie.login ? true : false);
  const [userData, setUserData] = useState({ name: '', mobile: '' });
  let isAdmin = false;
  if (cookie.mobile == import.meta.env.VITE_PHONE) {
    isAdmin = true
  }
  useEffect(() => {
    if (login) {
      setUserData({
        name: cookie.name,
        mobile: cookie.mobile
      })
    }
  }, [login])
  return <MovieContext.Provider
    value={{ login, userData, isAdmin }}
  >{children}</MovieContext.Provider>;
};

export default Context;
