
const downloadFile = (axiosDownloadInstance, url) => {
    if(!!axiosDownloadInstance)
        return axiosDownloadInstance(
            {
                method: "GET",
                url: url,
                responseType: "blob"
            });
    else{
        return undefined;
    }
}
export default downloadFile;