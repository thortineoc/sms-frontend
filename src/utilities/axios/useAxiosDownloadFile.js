import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";


const useAxiosDownloadFile = (urlBase) => {
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';
    return axios.create({
        baseURL: urlBase,
        responseType: "blob",
        headers: {
            Authorization: initialized ? `Bearer ${kcToken}` : undefined
        },
    });
}
export default useAxiosDownloadFile;