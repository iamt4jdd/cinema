import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth, setIsLoggedIn } = useAuth();

    const logout = async () => {
        setAuth({});
        setIsLoggedIn(false)
        try {
            await axios.get('/user/logout', {
                withCredentials: true
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout