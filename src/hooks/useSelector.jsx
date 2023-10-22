import { useContext } from "react"
import { DataContext } from "~/Context";

const useSelector = () => {
  return useContext(DataContext)
}

export default useSelector