import axios from 'axios';
import {useKeycloak} from '@react-keycloak/web';

const useAxios = (urlBase) => {
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';
    const axiosInstance = axios.create({
        baseURL: urlBase,
        headers: {
            Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            'Content-Type': 'application/json'
        },
    });

    return axiosInstance;
};

export default useAxios;