import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  return <h4>Це була помилка...</h4>;
};
export default ErrorElement;
