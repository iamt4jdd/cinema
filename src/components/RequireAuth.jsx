import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "~/hooks"

const RequireAuth = () => {
 
    const { auth } = useSelector()
    const location = useLocation()

    return (
        auth?.email ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth