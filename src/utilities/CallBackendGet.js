// ### USAGE EXAMPLE ###
// const axiosInstance = useAxios('http://52.142.201.18:24020/');
// const runBackendGet = useCallback((axiosInstance, url, data) => {
//     if (!!initialized) {
//         callBackendGet(axiosInstance, url, setResData, data);
//     }
// }, [initialized]);

import callBackend from "./CallBackend";

const callBackendGet = (axiosInstance, url, setResponseData, data) => {
    callBackend(axiosInstance, url, setResponseData, data, "get")
}
export default callBackendGet;
