import * as React from "react";
import { type FC, memo } from "react";
import {
  Card,
  CardContent,
  Box,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
import calendarIcon from "../../../assets/icons/svg/calendar.svg";
import visibilityIcon from "../../../assets/icons/svg/visibility.svg";
import editIcon from "../../../assets/icons/svg/edit.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import CustomTypography from "../../atoms/Typography";
import CustomIcon from "../../atoms/Icon";
import { BOOK_CARD_CONSTANTS } from "../../../utils/constants";
import type { BookCardProps } from "../../../utils/interfaces";

const StyledCard = styled(Card)(({ theme }) => ({
  width: 320,
  height: 250,
  padding: theme.spacing(3),
  "&:hover": {
    "& .title-typography": {
      color: theme.customColors.primary.main,
    },
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: theme.spacing(5),
  padding: 0,
  "&:last-child": {
    paddingBottom: 0,
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: theme.spacing(1),
  textAlign: "left",
  flex: 1,
}));

const TitleContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
});

const TitleTypography = styled(CustomTypography)(({ theme }) => ({
  transitionProperty:
    "color, background-color, border-color, text-decoration-color, fill, stroke",
  transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
  transitionDuration: ".15s",
  color: theme.customColors.text.primary,
  flex: 1,
}));

const AuthorTypography = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
}));

const YearContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const YearIcon = styled(CustomIcon)(({ theme }) => ({
  fontSize: 16,
  marginRight: theme.spacing(1.5),
  color: theme.customColors.text.secondary,
  filter:
    "brightness(0) saturate(100%) invert(45%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
  width: "16px",
  height: "16px",
}));

const YearTypography = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
  fontSize: 16,
}));

const ActionStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(1.5),
  marginTop: "auto",
}));

const ActionButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  flex: 1,
  justifyContent: "center",
  padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius,
  minWidth: "fit-content",
  "&:hover": {
    opacity: 0.8,
    background: theme.customColors.background.light,
    transform: "translateY(-1px)",
  },
}));

const ActionIcon = styled(CustomIcon)(({ theme }) => ({
  fontSize: 20,
  marginRight: theme.spacing(1),
  color: theme.customColors.text.primary,
  width: "20px",
  height: "20px",
}));

const ActionTypography = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  fontWeight: 800,
  whiteSpace: "nowrap",
  overflow: "visible",
  textOverflow: "clip",
  display: "block",
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.customColors.error.main,
  flex: 1,
  padding: theme.spacing(1.25),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease-in-out",
  minWidth: 0,
  "&:hover": {
    backgroundColor: theme.customColors.background.light,
    transform: "translateY(-1px)",
  },
}));

const StyledDeleteIcon = styled(CustomIcon)(({ theme }) => ({
  fontSize: 20,
  color: theme.customColors.error.main,
  filter:
    "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
  width: "20px",
  height: "20px",
}));

const ViewSection = styled(Box)({
  flex: 2,
});

const ViewSectionFull = styled(Box)({
  flex: 1,
});

const EditDeleteSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  gap: theme.spacing(1.5),
}));

const BookCard: FC<BookCardProps> = memo(
  ({
    title,
    author,
    year_published,
    onView,
    onEdit,
    onDelete,
    isAdmin = false,
  }) => {
    const showAdminButtons = isAdmin && onEdit && onDelete;

    return (
      <StyledCard>
        <StyledCardContent>
          <HeaderContainer>
            <TitleContainer>
              <TitleTypography
                variant="h3"
                component="h2"
                className="title-typography"
              >
                {title}
              </TitleTypography>
            </TitleContainer>
            <AuthorTypography variant="body1" component="p">
              {BOOK_CARD_CONSTANTS.AUTHOR_PREFIX} {author}
            </AuthorTypography>
            <YearContainer>
              <YearIcon src={calendarIcon} alt="Calendar" />
              <YearTypography variant="body2" component="span">
                {year_published}
              </YearTypography>
            </YearContainer>
          </HeaderContainer>

          <ActionStack
            direction="row"
            spacing={1}
            justifyContent="space-between"
          >
            {showAdminButtons ? (
              <>
                <ViewSection>
                  <ActionButton onClick={onView}>
                    <ActionIcon src={visibilityIcon} alt="View" />
                    <ActionTypography variant="body2">
                      {BOOK_CARD_CONSTANTS.VIEW_BUTTON}
                    </ActionTypography>
                  </ActionButton>
                </ViewSection>

                <EditDeleteSection>
                  <ActionButton onClick={onEdit}>
                    <ActionIcon src={editIcon} alt="Edit" />
                    <ActionTypography variant="body2">
                      {BOOK_CARD_CONSTANTS.EDIT_BUTTON}
                    </ActionTypography>
                  </ActionButton>

                  <DeleteButton size="small" onClick={onDelete}>
                    <StyledDeleteIcon
                      src={deleteIcon}
                      alt={BOOK_CARD_CONSTANTS.DELETE_BUTTON}
                    />
                  </DeleteButton>
                </EditDeleteSection>
              </>
            ) : (
              <ViewSectionFull>
                <ActionButton onClick={onView}>
                  <ActionIcon src={visibilityIcon} alt="View" />
                  <ActionTypography variant="body2">
                    {BOOK_CARD_CONSTANTS.VIEW_BUTTON}
                  </ActionTypography>
                </ActionButton>
              </ViewSectionFull>
            )}
          </ActionStack>
        </StyledCardContent>
      </StyledCard>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.author === nextProps.author &&
      prevProps.year_published === nextProps.year_published &&
      prevProps.isAdmin === nextProps.isAdmin &&
      Boolean(prevProps.onView) === Boolean(nextProps.onView) &&
      Boolean(prevProps.onEdit) === Boolean(nextProps.onEdit) &&
      Boolean(prevProps.onDelete) === Boolean(nextProps.onDelete)
    );
  }
);

export default BookCard;
