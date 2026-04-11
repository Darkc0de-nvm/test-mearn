import { useState } from "react";
import { Form, redirect, Link, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { DEMO_USER } from "../../../utils/constants";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const isLogin = !data.name;
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      await customFetch.post(endpoint, data);
      queryClient.invalidateQueries();
      toast.success(isLogin ? "Логін успішний!" : "Реєстрація успішна!");
      return redirect(isLogin ? "/dashboard" : "/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Register = () => {
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    try {
      await customFetch.post("/auth/login", DEMO_USER);
      toast.success("Ви тепер привид!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>{isMember ? "Login" : "Register"}</h4>

        {!isMember && (
          <>
            <FormRow type="text" name="name" labelText="name" />
            <FormRow type="text" name="lastName" labelText="lastname" />
            <FormRow type="text" name="location" labelText="location" />
          </>
        )}

        <FormRow type="email" name="email" labelText="email" />
        <FormRow type="password" name="password" labelText="password" />

        <SubmitBtn formBtn />

        {isMember && (
          <button
            type="button"
            className="btn btn-block"
            onClick={loginDemoUser}
          >
            Увійти як гість
          </button>
        )}

        <p>
          {isMember ? "Немає акаунта?" : "Вже є акаунт?"}
          <button
            type="button"
            className="member-btn"
            onClick={() => setIsMember(!isMember)}
          >
            {isMember ? "Зареєструватися" : "Увійти"}
          </button>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
