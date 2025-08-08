import * as React from "react";
import { type FC } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTypography from "../../components/atoms/Typography";
import CustomIcon from "../../components/atoms/Icon";
import CustomButton from "../../components/atoms/Button";
import { NOT_FOUND_CONSTANTS, ROUTES } from "../../utils/constants";
import bookBlueIcon from "../../assets/icons/svg/bookBlue.svg";

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.customColors.background.light,
  padding: theme.spacing(2),
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  maxWidth: "40rem",
  width: "100%",
  textAlign: "center",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
}));

const StyledIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  width: "6rem",
  height: "6rem",
  backgroundColor: theme.customColors.primary.main,
  borderRadius: theme.shape.borderRadius * 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  marginBottom: theme.spacing(3),
  "& img": {
    width: "3rem",
    height: "3rem",
    filter: "brightness(0) invert(1)",
  },
}));

const StyledErrorCode = styled(CustomTypography)(({ theme }) => ({
  fontSize: "6rem",
  fontWeight: 700,
  color: theme.customColors.primary.main,
  marginBottom: theme.spacing(2),
  lineHeight: 1,
}));

const StyledTitle = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

const StyledSubtitle = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
  marginBottom: theme.spacing(3),
  fontSize: "1.125rem",
}));

const StyledDescription = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
  flexWrap: "wrap",
}));

const StyledHomeButton = styled(CustomButton)(({ theme }) => ({
  backgroundColor: theme.customColors.primary.main,
  color: theme.customColors.primary.contrastText,
  padding: theme.spacing(1.5, 3),
  "&:hover": {
    backgroundColor: theme.customColors.primary.dark,
  },
}));

const StyledBackButton = styled(CustomButton)(({ theme }) => ({
  border: `1px solid ${theme.customColors.border.main}`,
  color: theme.customColors.text.primary,
  backgroundColor: theme.customColors.background.paper,
  padding: theme.spacing(1.5, 3),
  "&:hover": {
    backgroundColor: theme.customColors.background.light,
  },
}));

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledIconContainer>
          <StyledIcon>
            <CustomIcon src={bookBlueIcon} alt="Book" />
          </StyledIcon>
        </StyledIconContainer>

        <StyledErrorCode variant="h1" component="h1">
          {NOT_FOUND_CONSTANTS.ERROR_CODE}
        </StyledErrorCode>

        <StyledTitle variant="h3" component="h2">
          {NOT_FOUND_CONSTANTS.TITLE}
        </StyledTitle>

        <StyledSubtitle variant="h5" component="h3">
          {NOT_FOUND_CONSTANTS.SUBTITLE}
        </StyledSubtitle>

        <StyledDescription variant="body1">
          {NOT_FOUND_CONSTANTS.DESCRIPTION}
        </StyledDescription>

        <StyledButtonContainer>
          <StyledHomeButton variant="contained" onClick={handleGoHome}>
            {NOT_FOUND_CONSTANTS.GO_HOME_BUTTON}
          </StyledHomeButton>

          <StyledBackButton variant="outlined" onClick={handleGoBack}>
            {NOT_FOUND_CONSTANTS.GO_BACK_BUTTON}
          </StyledBackButton>
        </StyledButtonContainer>
      </StyledCard>
    </StyledContainer>
  );
};

export default NotFound;
