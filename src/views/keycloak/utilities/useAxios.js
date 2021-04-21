import {useEffect, useRef} from 'react';
import axios from 'axios';
import {useKeycloak} from '@react-keycloak/web';

const useAxios = (mBase) => {
    const axiosInstance = axios;
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';

    useEffect(() => {
        console.log("token: " + kcToken);
        console.log(mBase);
        if (kcToken === '') {
            console.log("Empty token!");
            return;
        }
        console.log("After return");
        axiosInstance.current = axios.create({
            baseURL: mBase,
            headers: {
                // Authorization: initialized ? `Bearer ${kcToken}` : undefined,
                'Access-Control-Allow-Headers': 'Authorization',
                'Authorization': `Bearer ${kcToken}`,
                // 'Access-Control-Allow-Origin': "*",
    },
        });

        return () => {
            axiosInstance.current = undefined;
        };
    }, [mBase, initialized, kcToken]);

    return axiosInstance;
};

export default useAxios;