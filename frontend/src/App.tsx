import { type FC, type ReactNode, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAuthStore } from "./store/authStore";
import { routes } from "./routes";

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>
                    <route.element />
                  </ProtectedRoute>
                ) : (
                  <route.element />
                )
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
