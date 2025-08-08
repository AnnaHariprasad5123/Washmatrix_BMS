import * as React from "react";
import { type FC, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Alert } from "@mui/material";

import FormField from "../../molecules/FormField";
import CustomTypography from "../../atoms/Typography";
import { useAuthStore } from "../../../store/authStore";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  USER_USERNAME,
  USER_PASSWORD,
  LOGIN_CONSTANTS,
} from "../../../utils/constants";

import bookBlueIcon from "../../../assets/icons/svg/bookBlue.svg";
import profileIcon from "../../../assets/icons/svg/profile.svg";
import lockIcon from "../../../assets/icons/svg/lock.svg";
import ArrowForward from "../../../assets/icons/svg/logout.svg";
import CustomIcon from "../../atoms/Icon";
import CustomButton from "../../atoms/Button";
import type { LoginFormProps } from "../../../utils/interfaces";

const StyledLoginContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.customColors.background.light,
  padding: theme.spacing(2),
}));

const StyledLoginCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  maxWidth: "25rem",
  width: "100%",
}));

const StyledLogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const StyledLogoIcon = styled(Box)(({ theme }) => ({
  width: "3.75rem",
  height: "3.75rem",
  backgroundColor: theme.customColors.primary.main,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  "& img": {
    width: "2rem",
    height: "2rem",
    filter: "brightness(0) invert(1)",
  },
}));

const StyledTitle = styled(CustomTypography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(1),
  color: theme.customColors.text.primary,
}));

const StyledSubtitle = styled(CustomTypography)(({ theme }) => ({
  textAlign: "center",
  color: theme.customColors.text.secondary,
  marginBottom: theme.spacing(3),
}));

const StyledSignInButton = styled(CustomButton)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  marginTop: "0.625rem",
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1),
  },
}));

const ArrowIcon = styled(CustomIcon)({
  width: "1rem",
  height: "1rem",
  filter: "brightness(0) invert(1)",
});

const LoginForm: FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { login } = useAuthStore();

  const validateForm = useCallback(() => {
    const newErrors = {
      username: "",
      password: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = LOGIN_CONSTANTS.USERNAME_REQUIRED;
    }

    if (!formData.password.trim()) {
      newErrors.password = LOGIN_CONSTANTS.PASSWORD_REQUIRED;
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value.trim(),
      }));

      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }

      if (loginError) {
        setLoginError("");
      }
    },
    [errors, loginError]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setLoginError("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (
          formData.username === ADMIN_USERNAME &&
          formData.password === ADMIN_PASSWORD
        ) {
          login(formData.username, formData.password);
          onLoginSuccess?.();
        } else if (
          formData.username === USER_USERNAME &&
          formData.password === USER_PASSWORD
        ) {
          login(formData.username, formData.password);
          onLoginSuccess?.();
        } else {
          setLoginError(LOGIN_CONSTANTS.INVALID_CREDENTIALS);
        }
      } catch {
        setLoginError(LOGIN_CONSTANTS.LOGIN_ERROR);
      } finally {
        setIsLoading(false);
      }
    },
    [validateForm, formData, login, onLoginSuccess]
  );

  return (
    <StyledLoginContainer>
      <StyledLoginCard>
        <StyledLogoContainer>
          <StyledLogoIcon>
            <CustomIcon src={bookBlueIcon} alt="Book" />
          </StyledLogoIcon>
        </StyledLogoContainer>

        <StyledTitle variant="h4" component="h1">
          {LOGIN_CONSTANTS.WELCOME_TITLE}
        </StyledTitle>

        <StyledSubtitle variant="body1">
          {LOGIN_CONSTANTS.SUBTITLE}
        </StyledSubtitle>

        <Box component="form" onSubmit={handleSubmit}>
          <FormField
            label={LOGIN_CONSTANTS.USERNAME_LABEL}
            placeholder={LOGIN_CONSTANTS.USERNAME_PLACEHOLDER}
            icon={<CustomIcon src={profileIcon} alt="User" />}
            value={formData.username}
            onChange={handleInputChange("username")}
            error={errors.username}
            required
            disabled={isLoading}
          />

          <FormField
            label={LOGIN_CONSTANTS.PASSWORD_LABEL}
            placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
            icon={<CustomIcon src={lockIcon} alt="Lock" />}
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            required
            disabled={isLoading}
          />

          {loginError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {loginError}
            </Alert>
          )}

          <StyledSignInButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={<ArrowIcon src={ArrowForward} alt="arrow-forward" />}
          >
            {isLoading
              ? LOGIN_CONSTANTS.SIGNING_IN_BUTTON
              : LOGIN_CONSTANTS.SIGN_IN_BUTTON}
          </StyledSignInButton>
        </Box>
      </StyledLoginCard>
    </StyledLoginContainer>
  );
};

export default LoginForm;
