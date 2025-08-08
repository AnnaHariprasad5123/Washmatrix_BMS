import * as React from "react";
import { Typography, type TypographyProps } from "@mui/material";
import { type FC } from "react";

const CustomTypography: FC<TypographyProps> = (props) => {
  return <Typography {...props} />;
};

export default CustomTypography;
