import * as React from "react";
import { Button, type ButtonProps } from "@mui/material";
import { type FC } from "react";

const CustomButton: FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

export default CustomButton;
