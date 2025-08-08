import * as React from "react";
import { type FC } from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/organisms/LoginForm";
import { ROUTES } from "../../utils/constants";

const StyledLoginPage = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.customColors.background.light,
}));

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log("Login successful, redirecting...");
    navigate(ROUTES.BOOKS);
  };

  return (
    <StyledLoginPage>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </StyledLoginPage>
  );
};

export default LoginPage;
