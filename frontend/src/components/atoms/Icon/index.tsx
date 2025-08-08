import * as React from "react";
import { type FC } from "react";
import type { CustomIconProps } from "../../../utils/interfaces";

const CustomIcon: FC<CustomIconProps> = ({ src, alt, className, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
    />
  );
};

export default CustomIcon;
