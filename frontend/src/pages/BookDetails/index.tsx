import * as React from "react";
import { type FC, Suspense, lazy } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowBack } from "@mui/icons-material";
import CustomTypography from "../../components/atoms/Typography";
import CustomIcon from "../../components/atoms/Icon";
import { getBook } from "../../service";
import profileIcon from "../../assets/icons/svg/profile.svg";
import calendarIcon from "../../assets/icons/svg/calendar.svg";
import bookBlueIcon from "../../assets/icons/svg/bookBlue.svg";
import { BOOK_DETAILS_CONSTANTS, ROUTES } from "../../utils/constants";

const BookShelfTemplate = lazy(
  () => import("../../components/templates/BookShelf")
);

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

const StyledBackSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  maxWidth: "50rem",
  margin: "0 auto",
}));

const StyledBackLink = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "center",
  padding: theme.spacing(1.25, 2),
  borderRadius: theme.shape.borderRadius,
  minWidth: "fit-content",
  "&:hover": {
    opacity: 0.8,
    background: theme.customColors.background.light,
  },
}));

const StyledBackText = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  whiteSpace: "nowrap",
  overflow: "visible",
  textOverflow: "clip",
  display: "block",
}));

const StyledArrowBack = styled(ArrowBack)(({ theme }) => ({
  fontSize: 20,
  marginRight: theme.spacing(1),
  color: theme.customColors.text.primary,
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  maxWidth: "50rem",
  margin: "0 auto",
}));

const StyledTitle = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  marginBottom: theme.spacing(2),
  textAlign: "left",
}));

const StyledAuthor = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  color: theme.customColors.text.secondary,
}));

const StyledAuthorText = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
}));

const StyledDetailSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.customColors.background.paper,
  borderRadius: theme.spacing(1),
  border: `0.0625rem solid ${theme.customColors.border.light}`,
}));

const StyledDetailLabel = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
  minWidth: "7.5rem",
}));

const StyledDetailValue = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
}));

const StyledDescriptionSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.customColors.background.light,
  borderRadius: theme.spacing(1),
  border: `0.0625rem solid ${theme.customColors.border.light}`,
}));

const StyledDescriptionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const StyledDescriptionText = styled(CustomTypography)(({ theme }) => ({
  lineHeight: 1.6,
  color: theme.customColors.text.primary,
}));

const StyledLoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "25rem",
});

const StyledCalendarIcon = styled(CustomIcon)({
  filter: `brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(199deg) brightness(104%) contrast(97%)`,
});

const StyledBookIcon = styled(CustomIcon)({
  filter: `brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(199deg) brightness(104%) contrast(97%)`,
});

const BookDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(parseInt(id!)),
    enabled: !!id,
  });

  const handleBackClick = () => {
    navigate(ROUTES.BOOKS);
  };

  if (isLoading) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <BookShelfTemplate>
          <StyledLoadingContainer>
            <CustomTypography>
              {BOOK_DETAILS_CONSTANTS.LOADING_MESSAGE}
            </CustomTypography>
          </StyledLoadingContainer>
        </BookShelfTemplate>
      </Suspense>
    );
  }

  if (error || !book) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <BookShelfTemplate>
          <StyledLoadingContainer>
            <CustomTypography color="error">
              {BOOK_DETAILS_CONSTANTS.ERROR_MESSAGE}
            </CustomTypography>
          </StyledLoadingContainer>
        </BookShelfTemplate>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookShelfTemplate>
        <StyledBackSection>
          <StyledBackLink onClick={handleBackClick}>
            <StyledArrowBack />
            <StyledBackText>
              {BOOK_DETAILS_CONSTANTS.BACK_TO_BOOKS}
            </StyledBackText>
          </StyledBackLink>
        </StyledBackSection>
        <StyledCard>
          <StyledTitle variant="h2" component="h1">
            {book.title}
          </StyledTitle>

          <StyledAuthor>
            <CustomIcon src={profileIcon} alt="Author" />
            <StyledAuthorText variant="h6">by {book.author}</StyledAuthorText>
          </StyledAuthor>

          <StyledDetailSection>
            <StyledCalendarIcon src={calendarIcon} alt="Publication Year" />
            <StyledDetailLabel variant="body1">
              {BOOK_DETAILS_CONSTANTS.PUBLICATION_YEAR_LABEL}
            </StyledDetailLabel>
            <StyledDetailValue variant="body1">
              {book.year_published}
            </StyledDetailValue>
          </StyledDetailSection>

          <StyledDescriptionSection>
            <StyledDescriptionHeader>
              <StyledBookIcon src={bookBlueIcon} alt="Description" />
              <CustomTypography variant="h4" component="h2">
                {BOOK_DETAILS_CONSTANTS.DESCRIPTION_HEADER}
              </CustomTypography>
            </StyledDescriptionHeader>
            <StyledDescriptionText variant="body1">
              {book.description}
            </StyledDescriptionText>
          </StyledDescriptionSection>
        </StyledCard>
      </BookShelfTemplate>
    </Suspense>
  );
};

export default BookDetails;
