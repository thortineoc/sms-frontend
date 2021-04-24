// ### USAGE EXAMPLE ###
// const axiosInstance = useAxios('http://52.142.201.18:24020/');
// const runBackend = useCallback((axiosInstance, url, data) => {
//     if (!!initialized) {
//         callBackendDelete(axiosInstance, url, data)
//                      .then(response => doSomething(response))
//                      .catch( error => console.log(error));
//     }
// }, [initialized]);

import callBackend from "./CallBackend";

const callBackendDelete = (axiosInstance, url, data) => {
    callBackend(axiosInstance, url, data, "delete")
}
export default callBackendDelete;
