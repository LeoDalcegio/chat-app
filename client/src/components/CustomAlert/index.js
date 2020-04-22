import React from 'react';
import { Alert } from '@material-ui/lab';

export default function CustomAlert({ message, severity }){
    if(severity === "error"){
        return(
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                { message }
            </Alert>
        )
    }

    if(severity === "warning"){
        return(
            <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                { message }
            </Alert>
        )
    }

    if(severity === "info"){
        return(
            <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                { message }
            </Alert>
        )
    }

    if(severity === "success"){
        return(
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                { message }
            </Alert>
        )
    }
}
