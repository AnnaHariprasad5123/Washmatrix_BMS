import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/Login"));
const ViewBooks = lazy(() => import("../pages/ViewBooks"));
const BookDetails = lazy(() => import("../pages/BookDetails"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const routes = [
  {
    path: "/",
    element: LoginPage,
  },
  {
    path: "/books",
    element: ViewBooks,
    protected: true,
  },
  {
    path: "/book/:id",
    element: BookDetails,
    protected: true,
  },
  {
    path: "*",
    element: NotFound,
  },
];
