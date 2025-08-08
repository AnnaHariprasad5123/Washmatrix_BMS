import type { TextFieldProps } from "@mui/material";

export interface Book {
  id: number;
  title: string;
  author: string;
  year_published: number;
  description: string;
}

export interface BookListItem {
  id: string;
  title: string;
  author: string;
  year_published: number;
}

export interface CustomIconProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormFieldProps extends Omit<TextFieldProps, "error"> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export interface BookCardProps {
  title: string;
  author: string;
  year_published: number;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export interface NavbarProps {
  onAddBook?: () => void;
  onLogout?: () => void;
  username?: string;
  isAdmin?: boolean;
}

export interface BookFormData {
  title: string;
  author: string;
  year_published: number;
  description: string;
}

export interface BookFormErrors {
  title?: string;
  author?: string;
  year_published?: string;
  description?: string;
}

export interface BookFormProps {
  open: boolean;
  mode: "create" | "edit";
  bookId?: string;
  initialData?: BookFormData;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface BookListProps {
  books: BookListItem[];
  onView?: (bookId: string) => void;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
  isAdmin?: boolean;
}

export interface BookShelfTemplateProps {
  children: React.ReactNode;
  onAddBook?: () => void;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  year_published: number;
  description: string;
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> {
  id: number;
}
