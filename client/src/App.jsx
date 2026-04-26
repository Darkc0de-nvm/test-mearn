import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  Profile,
  Stats,
  Admin,
  EditJob,
} from "./pages";

import { action as authAction } from "./pages/Register";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
import ErrorElement from "./components/ErrorElement";

export const checkDefaultDarkTheme = () => {
  const isDarkTheme = localStorage.getItem("DarkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkthemeEnabled = checkDefaultDarkTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: authAction(queryClient),
      },
      {
        path: "login",
        element: <Register />,
        action: authAction(queryClient),
      },
      {
        path: "dashboard",
        element: (
          <DashboardLayout
            isDarkThemeEnabled={isDarkthemeEnabled}
            queryClient={queryClient}
          />
        ),
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          { path: `delete-job/:id`, action: deleteJobAction(queryClient) },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
