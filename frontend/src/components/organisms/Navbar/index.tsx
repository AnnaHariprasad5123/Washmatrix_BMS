import * as React from "react";
import { type FC, useState, useCallback, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  styled,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import CustomTypography from "../../atoms/Typography";
import CustomIcon from "../../atoms/Icon";
import bookIcon from "../../../assets/icons/svg/logo.svg";
import addIcon from "../../../assets/icons/svg/add.svg";
import userIcon from "../../../assets/icons/svg/profile.svg";
import logoutIcon from "../../../assets/icons/svg/logout.svg";
import { NAVBAR_CONSTANTS } from "../../../utils/constants";
import type { NavbarProps } from "../../../utils/interfaces";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.customColors.background.default,
  borderBottom: `1px solid ${theme.customColors.border.main}`,
  padding: theme.spacing(1),
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2.5),
  background: theme.customColors.primary.dark,
  borderRadius: theme.shape.borderRadius * 1.5,
  height: "2.5rem",
  width: "2.5rem",
}));

const LogoIcon = styled(CustomIcon)({
  height: "2.5rem",
  width: "2.5rem",
  padding: "6px",
  filter: "brightness(0) saturate(100%) invert(100%)",
});

const LogoText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minWidth: "fit-content",
});

const MainTitle = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  whiteSpace: "nowrap",
}));

const SubTitle = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.secondary,
  whiteSpace: "nowrap",
}));

const RightSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2.5),
}));

const AddBookButton = styled(Button)(({ theme }) => ({
  width: 110,
  height: 36,
  backgroundColor: theme.customColors.primary.main,
  color: theme.customColors.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: `0px ${theme.spacing(1.5)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: theme.customColors.primary.dark,
  },
}));

const AddIcon = styled(CustomIcon)(({ theme }) => ({
  width: "16px",
  height: "16px",
  marginRight: theme.spacing(0.5),
  filter: "brightness(0) saturate(100%) invert(100%)",
  color: theme.customColors.primary.contrastText,
}));

const UserSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.customColors.background.light,
  },
  "&:focus": {
    backgroundColor: theme.customColors.background.light,
    outline: "none",
  },
}));

const UserIcon = styled(CustomIcon)(({ theme }) => ({
  width: "20px",
  height: "20px",
  color: theme.customColors.text.secondary,
}));

const AdminBadge = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  display: "flex",
  alignItems: "center",
}));

const LogoutIcon = styled(CustomIcon)(({ theme }) => ({
  width: "16px",
  height: "16px",
  color: theme.customColors.error.main,
  marginRight: theme.spacing(1),
}));

const MenuItemText = styled(CustomTypography)({
  fontSize: "0.875rem",
});

const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.customColors.error.main,
  "&:hover": {
    backgroundColor: theme.customColors.background.light,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "200px",
    marginTop: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.customColors.border.main}`,
  },
}));

const Navbar: FC<NavbarProps> = ({
  onAddBook,
  onLogout,
  username = "",
  isAdmin = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isAdmin) {
      import("../BookModelForm");
    }
    import("../../templates/BookShelf");
    import("../BookList");
  }, [isAdmin]);

  const handleUserClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    onLogout?.();
    handleClose();
  }, [onLogout]);

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoContainer>
          <LogoIcon src={bookIcon} alt="BookShelf" />
          <LogoText>
            <MainTitle variant="h2">{NAVBAR_CONSTANTS.APP_TITLE}</MainTitle>
            <SubTitle variant="body2" component="p">
              {NAVBAR_CONSTANTS.SUBTITLE}
            </SubTitle>
          </LogoText>
        </LogoContainer>

        <RightSection>
          {isAdmin && (
            <AddBookButton onClick={onAddBook}>
              <AddIcon src={addIcon} alt="Add" />
              {NAVBAR_CONSTANTS.ADD_BOOK_BUTTON}
            </AddBookButton>
          )}

          <UserSection onClick={handleUserClick}>
            <UserIcon src={userIcon} alt="User" />
            <AdminBadge variant="body2">
              {username}{" "}
              {isAdmin
                ? NAVBAR_CONSTANTS.ADMIN_SUFFIX
                : NAVBAR_CONSTANTS.USER_SUFFIX}
            </AdminBadge>
          </UserSection>

          <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <LogoutMenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon src={logoutIcon} alt="Logout" />
              </ListItemIcon>
              <MenuItemText>{NAVBAR_CONSTANTS.LOGOUT_MENU_ITEM}</MenuItemText>
            </LogoutMenuItem>
          </StyledMenu>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
