import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: blue[500],
            }}
        >
            <Typography variant="h1" style={{ color: "white" }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: "white" }}>
                Tакой страницы не существует
            </Typography>
            <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
            >
                Назад
            </Button>
        </Box>
    );
};
export default ErrorPage;
