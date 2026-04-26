import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h2>
            Job <span>tracking</span> app
          </h2>
          <p>
            Керуйте своїм пошуком роботи без зайвого хаосу. Наш додаток допоможе
            вам організувати відгуки, відстежувати статус співбесід та
            аналізувати вашу активність в одному зручному інтерфейсі.
          </p>
          <Link to="/register" className="btn register-link">
            Реєстрація
          </Link>
          <Link to="/login" className="btn login-link">
            Вхід / гість
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
