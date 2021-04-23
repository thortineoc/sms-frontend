const callBackend = (axiosInstance, url, setResponseData, data, method) => {
    !!axiosInstance && axiosInstance(
        {
            method: method,
            url: url,
            data: data
        }
    )
        .then((response) => {
                setResponseData(response);
            }
        )
        .catch((error) => console.log(error));
}
export default callBackend;