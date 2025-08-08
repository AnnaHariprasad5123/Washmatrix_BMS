import * as React from "react";
import { type FC, useState, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormField from "../../molecules/FormField";
import CustomButton from "../../atoms/Button";
import CustomIcon from "../../atoms/Icon";
import { createBook, updateBook } from "../../../service";
import saveIcon from "../../../assets/icons/svg/save.svg";
import closeIcon from "../../../assets/icons/svg/close.svg";
import CustomTypography from "../../atoms/Typography";
import {
  BOOK_FORM_CONSTANTS,
  VALIDATION_CONSTANTS,
} from "../../../utils/constants";
import type {
  BookFormData,
  BookFormErrors,
  BookFormProps,
} from "../../../utils/interfaces";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    maxWidth: "800px",
    width: "100%",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const StyledDialogTitle = styled(CustomTypography)(({ theme }) => ({
  textAlign: "left",
  color: theme.customColors.text.primary,
  paddingBottom: theme.spacing(1),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const StyledFormRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  "& > *": {
    flex: 1,
  },
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  justifyContent: "center",
}));

const StyledSaveButton = styled(CustomButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.contrastText,
  },
}));

const SaveIcon = styled(CustomIcon)({
  width: "1rem",
  height: "1rem",
  filter: "brightness(0) invert(1)",
});

const StyledCancelButton = styled(CustomButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  border: `1px solid ${theme.customColors.border.main}`,
  color: theme.customColors.text.primary,
  backgroundColor: theme.customColors.background.paper,
  "&:hover": {
    backgroundColor: theme.customColors.background.light,
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1),
  },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BookForm: FC<BookFormProps> = ({
  open,
  mode,
  bookId,
  initialData,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    year_published: 0,
    description: "",
  });
  const [errors, setErrors] = useState<BookFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        author: "",
        year_published: 0,
        description: "",
      });
    }
    setSubmitError(null);
  }, [initialData, open]);

  const createMutation = useMutation({
    mutationFn: (data: BookFormData) => createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setIsLoading(false);
      setSubmitError(null);
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      console.error("Error creating book:", error);
      setIsLoading(false);
      setSubmitError(BOOK_FORM_CONSTANTS.CREATE_ERROR);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: BookFormData) =>
      updateBook({ id: parseInt(bookId!), ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setIsLoading(false);
      setSubmitError(null);
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      console.error("Error updating book:", error);
      setIsLoading(false);
      setSubmitError(BOOK_FORM_CONSTANTS.EDIT_ERROR);
    },
  });

  useEffect(() => {
    if (createMutation.error) {
      setSubmitError(BOOK_FORM_CONSTANTS.CREATE_ERROR);
    }
  }, [createMutation.error]);

  useEffect(() => {
    if (updateMutation.error) {
      setSubmitError(BOOK_FORM_CONSTANTS.EDIT_ERROR);
    }
  }, [updateMutation.error]);

  const validateForm = useCallback(() => {
    const newErrors: BookFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = BOOK_FORM_CONSTANTS.TITLE_REQUIRED;
    }

    if (!formData.author.trim()) {
      newErrors.author = BOOK_FORM_CONSTANTS.AUTHOR_REQUIRED;
    }

    if (
      !formData.year_published ||
      formData.year_published < VALIDATION_CONSTANTS.MIN_YEAR ||
      formData.year_published > VALIDATION_CONSTANTS.MAX_YEAR
    ) {
      newErrors.year_published = BOOK_FORM_CONSTANTS.YEAR_REQUIRED;
    }

    if (!formData.description.trim()) {
      newErrors.description = BOOK_FORM_CONSTANTS.DESCRIPTION_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof BookFormData) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value =
          field === "year_published"
            ? parseInt(event.target.value) || 0
            : event.target.value;

        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));

        if (errors[field]) {
          setErrors((prev) => ({
            ...prev,
            [field]: "",
          }));
        }
      },
    [errors]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setSubmitError(null);

      if (mode === "create") {
        createMutation.mutate(formData);
      } else {
        updateMutation.mutate(formData);
      }
    },
    [validateForm, mode, createMutation, updateMutation, formData]
  );

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const getTitle = () =>
    mode === "create"
      ? BOOK_FORM_CONSTANTS.CREATE_TITLE
      : BOOK_FORM_CONSTANTS.EDIT_TITLE;
  const getButtonText = () =>
    isLoading
      ? mode === "create"
        ? BOOK_FORM_CONSTANTS.CREATING_BUTTON
        : BOOK_FORM_CONSTANTS.UPDATING_BUTTON
      : mode === "create"
      ? BOOK_FORM_CONSTANTS.CREATE_BUTTON
      : BOOK_FORM_CONSTANTS.UPDATE_BUTTON;
  const getError = () => submitError;

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogContent>
        <StyledDialogTitle variant="h3" component="h2">
          {getTitle()}
        </StyledDialogTitle>

        <StyledForm onSubmit={handleSubmit} noValidate>
          <StyledFormRow>
            <FormField
              label={BOOK_FORM_CONSTANTS.TITLE_LABEL}
              placeholder={BOOK_FORM_CONSTANTS.TITLE_PLACEHOLDER}
              value={formData.title}
              onChange={handleInputChange("title")}
              error={errors.title}
              required
              disabled={isLoading}
            />

            <FormField
              label={BOOK_FORM_CONSTANTS.AUTHOR_LABEL}
              placeholder={BOOK_FORM_CONSTANTS.AUTHOR_PLACEHOLDER}
              value={formData.author}
              onChange={handleInputChange("author")}
              error={errors.author}
              required
              disabled={isLoading}
            />
          </StyledFormRow>

          <StyledFormRow>
            <FormField
              label={BOOK_FORM_CONSTANTS.PUBLICATION_YEAR_LABEL}
              placeholder={BOOK_FORM_CONSTANTS.PUBLICATION_YEAR_PLACEHOLDER}
              type="number"
              value={formData.year_published}
              onChange={handleInputChange("year_published")}
              error={errors.year_published}
              required
              disabled={isLoading}
              inputProps={{
                min: VALIDATION_CONSTANTS.MIN_YEAR,
                max: VALIDATION_CONSTANTS.MAX_YEAR,
              }}
            />
          </StyledFormRow>

          <FormField
            label={BOOK_FORM_CONSTANTS.DESCRIPTION_LABEL}
            placeholder={BOOK_FORM_CONSTANTS.DESCRIPTION_PLACEHOLDER}
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange("description")}
            error={errors.description}
            required
            disabled={isLoading}
          />

          {getError() && (
            <StyledAlert
              severity="error"
              data-testid="submit-error"
              sx={{ marginTop: 2 }}
            >
              {getError()}
            </StyledAlert>
          )}
        </StyledForm>
      </StyledDialogContent>

      <StyledDialogActions>
        <StyledSaveButton
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={<SaveIcon src={saveIcon} alt="Save" />}
          onClick={handleSubmit}
        >
          {getButtonText()}
        </StyledSaveButton>

        <StyledCancelButton
          type="button"
          variant="outlined"
          onClick={handleCancel}
          startIcon={<CustomIcon src={closeIcon} alt="Cancel" />}
        >
          {BOOK_FORM_CONSTANTS.CANCEL_BUTTON}
        </StyledCancelButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default BookForm;
