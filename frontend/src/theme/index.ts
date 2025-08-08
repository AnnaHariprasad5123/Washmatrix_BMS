import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customColors: ThemeColors;
    customSpacing: ThemeSpacing;
    customShape: ThemeShape;
  }
  interface ThemeOptions {
    customColors?: ThemeColors;
    customSpacing?: ThemeSpacing;
    customShape?: ThemeShape;
  }
}

export interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
    light: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  border: {
    main: string;
    light: string;
  };
  divider: string;
  icon: {
    main: string;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  xxxxl: number;
}

export interface ThemeShape {
  borderRadius: number;
}

const colors: ThemeColors = {
  primary: {
    main: "#2463EB",
    light: "#3B82F6",
    dark: "#1D4ED8",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#6B7280",
    light: "#9CA3AF",
    dark: "#4B5563",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#09090B",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
  },
  background: {
    default: "#FFFFFF",
    paper: "#FAFAFA",
    light: "#F3F4F6",
  },
  error: {
    main: "#EF4343",
    light: "#F87171",
    dark: "#DC2626",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#3B82F6",
    light: "#60A5FA",
    dark: "#2563EB",
    contrastText: "#FFFFFF",
  },
  border: {
    main: "#E5E7EB",
    light: "#F3F4F6",
  },
  divider: "#E5E7EB",
  icon: {
    main: "#1450d2",
  },
};

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

const shape: ThemeShape = {
  borderRadius: 8,
};

const theme: Theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    text: colors.text,
    background: colors.background,
    error: colors.error,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
    divider: colors.divider,
  },
  typography: {
    fontFamily: '"sans-serif", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      color: colors.text.primary,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.3,
      color: colors.text.primary,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: colors.text.primary,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: colors.text.primary,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: colors.text.primary,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.5,
      color: colors.text.secondary,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: "none",
    },
  },
  shape,
  spacing: (factor: number) => `${factor * 8}px`,
  customColors: colors,
  customSpacing: spacing,
  customShape: shape,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
          padding: "8px 16px",
          minHeight: "36px",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          "&:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
        outlined: {
          borderColor: colors.border.main,
          color: colors.text.primary,
          "&:hover": {
            backgroundColor: colors.background.light,
          },
        },
        text: {
          color: colors.text.primary,
          "&:hover": {
            backgroundColor: colors.background.light,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius * 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.20)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: shape.borderRadius,
            "& fieldset": {
              borderColor: colors.border.main,
            },
            "&:hover fieldset": {
              borderColor: colors.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.default,
          color: colors.text.primary,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderBottom: `1px solid ${colors.border.main}`,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily:
            '"sans-serif", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      },
    },
  },
});

export default theme;
