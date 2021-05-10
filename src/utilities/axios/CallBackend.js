const callBackend = (axiosInstance, url, data, method) => {
    if(!!axiosInstance)
        return axiosInstance(
            {
                method: method,
                url: url,
                data: data
            });
    else{
        return undefined;
    }
}
export default callBackend;