import * as React from "react";
import { type FC, memo, useCallback } from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../organisms/Navbar";
import { useAuthStore } from "../../../store/authStore";
import type { BookShelfTemplateProps } from "../../../utils/interfaces";

const TemplateContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.customColors.background.default,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const BookShelfTemplate: FC<BookShelfTemplateProps> = memo(
  ({ children, onAddBook }) => {
    const navigate = useNavigate();
    const { logout, username, isAdmin } = useAuthStore();
    const isUserAdmin = isAdmin();

    const handleLogout = useCallback(() => {
      logout();
      navigate("/");
    }, [logout, navigate]);

    return (
      <TemplateContainer>
        <Navbar
          onAddBook={onAddBook}
          onLogout={handleLogout}
          username={username || ""}
          isAdmin={isUserAdmin}
        />
        <ContentSection>{children}</ContentSection>
      </TemplateContainer>
    );
  }
);

BookShelfTemplate.displayName = "BookShelfTemplate";

export default BookShelfTemplate;
