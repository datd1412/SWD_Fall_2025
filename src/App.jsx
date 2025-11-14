import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DashboardList from "./pages/dashboard/DashboardList";
import { useUserStore } from "./stores/userStore";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import ReturnInspectionPage from "./pages/ReturnInspectionPage";
import CheckinPage from "./pages/CheckInPage";
import CheckingLayout from "./components/layouts/CheckingLayout";
import ErrorPage from "./pages/ErrorPage";
import HistoryPage from "./pages/HistoryPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import ToastProvider from "./components/providers/ToastProvider";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";

const ProtectedRoute = ({ children }) => {
  const { token } = useUserStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardList />,
          },
          {
            path: "check-in/:vehicleId",
            element: <CheckinPage />,
          },
          {
            path: "vehicle-detail/:vehicleId",
            element: <VehicleDetailPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
          },
        ],
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/check-in",
    element: <CheckingLayout />,
    children: [
      {
        path: "return/:vehicleId",
        element: <ReturnInspectionPage />,
      },
    ],
  },
  {
    path: "/check-out",
    element: (
      <ProtectedRoute>
        <CheckingLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":vehicleId",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
