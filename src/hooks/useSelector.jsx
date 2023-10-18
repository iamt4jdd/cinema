import { useContext } from "react"
import { Context } from "~/Context"

const useSelector = () => {
  return useContext(Context)
}

export default useSelector