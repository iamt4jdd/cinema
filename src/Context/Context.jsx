import { createContext, useState, useEffect } from "react";

const Context = createContext({});

export const Provider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem("movie")) || null
  );
  const [showTimeData, setShowTimeData] = useState(
    JSON.parse(localStorage.getItem("showTimeData")) || null
  );

  const [userContext, setUserContext] = useState(
    JSON.parse(localStorage.getItem("userContext")) || null
  );

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(movie));
    localStorage.setItem("showTimeData", JSON.stringify(showTimeData));
    localStorage.setItem("userContext", JSON.stringify(userContext));
  }, [movie, showTimeData, userContext]);

  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        movie,
        setMovie,
        showTimeData,
        setShowTimeData,
        userContext,
        setUserContext,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
