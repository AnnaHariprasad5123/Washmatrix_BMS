import * as React from "react";
import { TextField, type TextFieldProps } from "@mui/material";
import { type FC } from "react";

const CustomTextField: FC<TextFieldProps> = (props) => {
  return <TextField {...props} />;
};

export default CustomTextField;
