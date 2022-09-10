import { useState } from "react";
import axios from "axios";

export const useUploadForm = (url: string) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const resetProgress = () => setProgress(0);
    const resetError = () => setError(null);

    const uploadForm = async (formData: FormData) => {                
        await axios.post(`${url}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 50;
                setProgress(progress);
            },
            onDownloadProgress: (progressEvent) => {
                const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                setProgress(progress);
            },
        }).catch((error) => {
            console.log("Error once upload", error);
            if( error.response ){
                console.log(error.response.data); // => the response payload 
                setError(error.response.data);
            }
        });
        //setError(null);
        setIsSuccess(true)
    };

    return { uploadForm, resetProgress, isSuccess, progress, error, resetError };
};