// ### USAGE EXAMPLE ###
// const axiosInstance = useAxios('http://52.142.201.18:24020/');
// const runBackend = useCallback((axiosInstance, url, data) => {
//     if (!!initialized) {
//         callBackendGet(axiosInstance, url, data)
//                      .then(response => doSomething(response))
//                      .catch( error => console.log(error));
//     }
// }, [initialized]);

import callBackend from "./CallBackend";

const callBackendGet = (axiosInstance, url, data) => {
    return callBackend(axiosInstance, url, data, "get")
}
export default callBackendGet;
