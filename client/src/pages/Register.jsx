import {
  Form,
  redirect,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { DEMO_USER } from "../../../utils/constants";
import { FaUser } from "react-icons/fa";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const isLogin = data.isRegister !== "true";
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    delete data.isRegister;
    try {
      const response = await customFetch.post(endpoint, data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.invalidateQueries();
      toast.success(isLogin ? "Логін успішний!" : "Реєстрація успішна!");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Register = () => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    try {
      const response = await customFetch.post("/auth/login", DEMO_USER);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.invalidateQueries();
      toast.success("Ласкаво просимо, Гість!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>{isLogin ? "Вхід" : "Реєстрація"}</h4>
        <input type="hidden" name="isRegister" value={String(!isLogin)} />
        {!isLogin && (
          <>
            <FormRow
              type="text"
              name="name"
              labelText="Ім'я"
              placeholder="Andriy"
            />
            <FormRow
              type="text"
              name="lastName"
              labelText="Прізвище"
              placeholder="Kovalenko"
            />
            <FormRow
              type="text"
              name="location"
              labelText="Місто"
              placeholder="Kyiv"
            />
          </>
        )}
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          placeholder="autolover@example.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Пароль"
          placeholder="Мінімум 8 символів"
        />
        <SubmitBtn formBtn />
        {isLogin && (
          <button
            type="button"
            className="btn btn-block"
            onClick={loginDemoUser}
          >
            <FaUser /> Увійти як гість
          </button>
        )}
        <p>
          {isLogin ? "Немає акаунта?" : "Вже є акаунт?"}
          <Link to={isLogin ? "/register" : "/login"} className="member-btn">
            {isLogin ? "Зареєструватися" : "Увійти"}
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
