import { Outlet, redirect, useNavigate, useNavigation } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import Navbar from "../components/Navbar";
import SmallSidebar from "../components/SmallSidebar";
import BigSidebar from "../components/BigSidebar";
import Loading from "../components/Loading";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get(`/users/current-user`);
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect(`/`);
  }
};

const DashboardContext = createContext();
export const useDashboardContext = () => useContext(DashboardContext);

const DashboardLayout = ({ isDarkThemeEnabled, queryClient }) => {
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("DarkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate(`/`);
    await customFetch.post(`/auth/logout`);
    queryClient.invalidateQueries();
    toast.success(`Ви успішно вийшли!`);
  };

  useEffect(() => {
    const handleAuthError = () => {
      logoutUser();
    };

    const interceptor = customFetch.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          window.dispatchEvent(new Event("auth-error"));
        }
        return Promise.reject(error);
      },
    );

    window.addEventListener("auth-error", handleAuthError);

    return () => {
      window.removeEventListener("auth-error", handleAuthError);
      customFetch.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        isDarkTheme,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="main dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
