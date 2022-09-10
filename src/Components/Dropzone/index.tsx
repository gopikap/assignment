import React, { useState, useCallback, useEffect } from 'react';
import { LinearProgress, Paper } from '@mui/material';
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone';
import { useUploadForm } from '../../hooks/useUploadForm';
import { endPoint } from '../../App';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DropzoneContainer() {    
    const {uploadForm, resetProgress, progress, error, resetError} = useUploadForm(endPoint);
    const [myFiles, setMyFiles] = useState([])
    //@ts-ignore
    const onDrop = useCallback((acceptedFiles: any) => setMyFiles([...myFiles, ...acceptedFiles]), [myFiles])

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        accept: {
            'text/csv': ['.csv']
        },
        onDrop,
        onDropAccepted: async (acceptedFiles) => {
            await uploadFile(acceptedFiles)
        }
    })

    const removeFile = (file: any) => () => {
        const newFiles = [...myFiles]
        //@ts-ignore
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
        resetError();
      }
    
      const removeAll = () => {
        resetProgress();
        setMyFiles([])
        resetError();
      }

    const acceptedFileItems = myFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            <div style={{display:'flex'}}>
                <span>{file.path} - {file.size} bytes</span>
                <DeleteIcon onClick={removeFile(file)} />
            </div>
        </li>
    ));

    const fileRejectionItems = fileRejections.map((fileObj: FileRejection) => {
        const file: FileWithPath = fileObj.file;
        const errors = fileObj.errors;
        return (
            <li key={file['path']}>
                {file['path']} - {file['size']} bytes
                <ul>
                    {errors.map(e => (
                        <li key={e.code}>{e.message}</li>
                    ))}
                </ul>
            </li>
        )
    });

    const uploadFile = async (files:File[]) => {
        if (files && files.length > 0 ) {
            const formData = new FormData();
            formData.append('name', files[0].name);
            formData.append('file', files[0]); 
            try {
                return await uploadForm(formData);
            } catch(e:any) {
                console.log(JSON.stringify(e));
            }             
        }
    }
    
    return (
        <>            
            <div>
                <Paper>
                    <div {...getRootProps({ className: "dropzone" })} style={{ padding: 20, textAlign: 'center', border: '3px blue dashed' }}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <em>(Only *.csv is accepted)</em>
                    </div>
                </Paper>
                { error && <span style={{color:'red'}}>{error['error']}</span>}
                {myFiles && myFiles.length > 0 && <LinearProgress variant="determinate" value={progress} sx={{marginTop:2}} color="secondary" />}                
                <div>
                    <h4>Accepted files</h4>
                    <ul>{acceptedFileItems}</ul>
                    <h4>Rejected files</h4>
                    <ul>{fileRejectionItems}</ul>
                </div>          
                {myFiles.length > 0 && <button onClick={removeAll}>Remove All</button>}      
            </div>
        </>

    )
}