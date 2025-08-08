import * as React from "react";
import { type FC, memo } from "react";
import { styled } from "@mui/material/styles";
import { FormControl, FormHelperText, InputAdornment } from "@mui/material";
import CustomTextField from "../../atoms/TextField";
import CustomTypography from "../../atoms/Typography";
import type { FormFieldProps } from "../../../utils/interfaces";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const StyledLabel = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.text.primary,
  marginBottom: theme.spacing(0.5),
}));

const StyledErrorLabel = styled(CustomTypography)(({ theme }) => ({
  color: theme.customColors.error.main,
  marginBottom: theme.spacing(0.5),
}));

const StyledTextField = styled(CustomTextField)(({ theme }) => ({
  "& .MuiInputAdornment-root": {
    color: theme.customColors.text.secondary,
  },
}));

const StyledErrorText = styled(FormHelperText)(({ theme }) => ({
  color: theme.customColors.error.main,
  marginTop: theme.spacing(0.5),
}));

const FormField: FC<FormFieldProps> = memo(
  ({ label, error, icon, placeholder, ...textFieldProps }) => {
    const hasError = !!error;
    const LabelComponent = hasError ? StyledErrorLabel : StyledLabel;

    return (
      <StyledFormControl error={hasError}>
        <LabelComponent variant="body2" component="label">
          {label}
        </LabelComponent>

        <StyledTextField
          {...textFieldProps}
          error={hasError}
          placeholder={placeholder}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined,
            ...textFieldProps.InputProps,
          }}
        />

        {hasError && <StyledErrorText>{error}</StyledErrorText>}
      </StyledFormControl>
    );
  }
);

export default FormField;
