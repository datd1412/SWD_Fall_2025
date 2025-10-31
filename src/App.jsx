import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout"
import LoginPage from "./pages/auth/LoginPage"
import Dashboard from "./pages/dashboard/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
