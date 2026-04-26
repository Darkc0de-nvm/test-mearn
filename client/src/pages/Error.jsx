import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
import errorImg from "../assets/images/something-went-wrong.svg";
const Error = () => {
  const error = useRouteError();

  if (!error || error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Сторінку не знайдено</h3>
          <p>На жаль, сторінки, яку ви шукаєте, не існує.</p>
          <Link to="/dashboard">Повернутися на головну</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <img src={errorImg} alt="something went wrong" />
      <h3>Щось пішло не так</h3>
      <p>
        Сталася непередбачувана помилка. Спробуйте пізніше або поверніться на
        головну.
      </p>
      <Link to="/">На головну</Link>
    </Wrapper>
  );
};
export default Error;
