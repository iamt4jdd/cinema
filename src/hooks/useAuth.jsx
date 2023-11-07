import { useContext, useDebugValue } from "react";
import { AuthContext } from "~/Context";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.accountId ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;