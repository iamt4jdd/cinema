import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "~/hooks"

const RequireAuth = () => {
 
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.accountId ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth