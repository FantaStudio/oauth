import { Alert as MuiAlert, AlertTitle } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeAlert,
    selectAlertInfo,
} from "../../services/components/alert/slice";

const Alert = () => {
    const dispatch = useDispatch();
    const alertInfo = useSelector(selectAlertInfo);

    const handleCloseAlert = () => {
        dispatch(closeAlert());
    };

    return (
        alertInfo.open && (
            <MuiAlert
                severity={alertInfo?.type || "error"}
                onClose={handleCloseAlert}
            >
                <AlertTitle>{alertInfo?.title || "Ошибка!"}</AlertTitle>
                {alertInfo?.message || "Произошла неизвестная ошибка"}
            </MuiAlert>
        )
    );
};

export default Alert;
