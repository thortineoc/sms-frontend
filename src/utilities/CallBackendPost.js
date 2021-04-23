// ### USAGE EXAMPLE ###
// const axiosInstance = useAxios('http://52.142.201.18:24020/');
// const runBackend = useCallback((axiosInstance, url, data) => {
//     if (!!initialized) {
//         callBackendPost(axiosInstance, url, setResData, data);
//     }
// }, [initialized]);

import callBackend from "./CallBackend";

const callBackendPost = (axiosInstance, url, setResponseData, data) => {
    callBackend(axiosInstance, url, setResponseData, data, "post")
}
export default callBackendPost;
