import axios from '../api/axios';
import useSelector from './useSelector';

const useRefreshToken = () => {
    const { setAuth } = useSelector();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;