// ### USAGE EXAMPLE ###
// const axiosInstance = useAxios('http://52.142.201.18:24020/');
// const runBackendGet = useCallback((axiosInstance, url, data) => {
//     if (!!initialized) {
//         callBackendGet(axiosInstance, url, setResData, data);
//     }
// }, [initialized]);

const callBackendGet = (axiosInstance, url, setResponseData, data) => {
    !!axiosInstance && axiosInstance.get(url, data)
        .then((response) => {
                setResponseData(response.data);
            }
        )
        .catch((error) => console.log(error));
}
export default callBackendGet;
