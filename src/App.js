import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:projectName" element={<HomePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "*",
        Component: Root,
        errorElement: <ErrorPage />,
      },
    ],
    { basename: "/" }
  );
  return <RouterProvider router={router} />;
};

export default App;
