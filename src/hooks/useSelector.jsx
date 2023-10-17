import { useContext } from "react"
import { Context } from "~/Context"

const useAuth = () => {
  return useContext(Context)
}

export default useAuth