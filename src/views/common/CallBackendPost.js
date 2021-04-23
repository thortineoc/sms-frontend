// ### USAGE EXAMPLE ###
// const axiosInstance = useAxios('http://52.142.201.18:24020/');
// const runBackendGet = useCallback((axiosInstance, url, data) => {
//     if (!!initialized) {
//         callBackendPost(axiosInstance, url, setResData, data);
//     }
// }, [initialized]);

const callBackendPost = (axiosInstance, url, setResponseData, data) => {
    !!axiosInstance && axiosInstance.post(url, data)
        .then((response) => {
                setResponseData(response.data);
            }
        )
        .catch((error) => console.log(error));
}
export default callBackendPost;