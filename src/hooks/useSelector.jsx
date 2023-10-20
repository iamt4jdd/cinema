import { useContext, useDebugValue } from "react"
import { Context } from "~/Context"

const useSelector = () => {
  const { auth } = useContext(Context);
  useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out")
  return useContext(Context)
}

export default useSelector