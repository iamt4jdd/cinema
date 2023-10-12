import { createContext, useState } from "react";


const Context = createContext({});


export const Provider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [movie, setMovie] = useState();


  return (
    <Context.Provider value={{ auth, setAuth, movie, setMovie }}>
      {children}
    </Context.Provider>
  );
};

export default Context;