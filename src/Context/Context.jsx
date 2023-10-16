import { createContext, useState, useEffect } from "react";


const Context = createContext({});


export const Provider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem('movie')) || null
  ); 
  const [showTimeData, setShowTimeData] = useState(
    JSON.parse(localStorage.getItem('showTimeData')) || null
  );

  useEffect(() => {
    localStorage.setItem('movie', JSON.stringify(movie));
    localStorage.setItem('showTimeData', JSON.stringify(showTimeData));
  }, [movie, showTimeData]);

  return (
    <Context.Provider value={{ auth, setAuth, movie, setMovie, showTimeData, setShowTimeData }}>
      {children}
    </Context.Provider>
  );
};

export default Context;