import styled from "styled-components";

const Wrapper = styled.section`
  /* Фон для всього екрану (додаємо легкий градієнт на задній план) */
  background:
    radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.05) 0, transparent 50%),
    radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.05) 0, transparent 50%);

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    /* Логотип тепер виглядає трохи чіткіше */
    img {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -4rem;
    gap: 4rem;
  }

  /* Заголовок з ефектом градієнтного тексту */
  h1 {
    font-weight: 800;
    font-size: clamp(2.5rem, 5vw, 4.5rem); /* Адаптивний розмір шрифту */
    line-height: 1.1;
    margin-bottom: 2rem;
    color: var(--grey-900);
    letter-spacing: -0.04em;

    span {
      background: linear-gradient(90deg, var(--primary-500), #60a5fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
    }
  }

  p {
    line-height: 1.8;
    color: var(--text-secondary-color);
    margin-bottom: 2.5rem;
    max-width: 40em;
    font-size: 1.2rem;
    font-weight: 400;
  }

  /* Кнопки з ефектом глибини */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 12px; /* Більш закруглені кути */
    padding: 1rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid transparent;
  }

  .register-link {
    background: var(--primary-500);
    color: white;
    box-shadow: 0 10px 20px -10px var(--primary-500);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 30px -12px var(--primary-500);
      background: var(--primary-600);
    }
  }

  .login-link {
    margin-left: 1rem;
    background: white;
    color: var(--grey-800);
    border: 1px solid var(--grey-200);

    &:hover {
      background: var(--grey-50);
      border-color: var(--grey-300);
      transform: translateY(-5px);
    }
  }

  /* Ілюстрація з ефектом плавання (floating) */
  .main-img {
    display: none;
    width: 100%;
    filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.1));
    animation: float 6s ease-in-out infinite;
  }

  /* Анімація плавання для картинки */
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1.2fr 1fr;
    }
    .main-img {
      display: block;
    }
  }

  h2 {
    font-weight: 700;
    margin-bottom: 1rem;

    span {
      color: var(--primary-500);
    }
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

export default Wrapper;
