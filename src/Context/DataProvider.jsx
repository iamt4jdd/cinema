import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  
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
  }, [movie, showTimeData, userContext,]);

  return (
    <DataContext.Provider
      value={{
        movie,
        setMovie,
        showTimeData,
        setShowTimeData,
        userContext,
        setUserContext,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
