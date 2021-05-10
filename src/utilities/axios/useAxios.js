import axios from 'axios';
import {useKeycloak} from '@react-keycloak/web';

const useAxios = (urlBase) => {
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';
    return axios.create({
        baseURL: urlBase,
        headers: {
            Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            'Content-Type': 'application/json'
        },
    });
};

export default useAxios;