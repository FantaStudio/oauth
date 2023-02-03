import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { useSelector } from "react-redux";
import { selectLoaderInfo } from "../../services/components/loader/slice";

const Loader = () => {
    const loaderInfo = useSelector(selectLoaderInfo);
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loaderInfo.visible}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;
