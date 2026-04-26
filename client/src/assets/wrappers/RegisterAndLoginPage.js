import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  /* ЗМІНЕНО: background-color тепер динамічний */
  background-color: var(--background-color);
  padding: 2rem 0;

  .form {
    width: 90vw;
    max-width: 400px;
    /* ЗМІНЕНО: background тепер динамічний (вторинний фон) */
    background: var(--background-secondary-color);
    padding: 2rem 2.5rem;
    border-radius: var(--border-radius);
    border-top: 5px solid var(--primary-500);
    box-shadow: var(--shadow-2);
    margin: 0 auto;
    /* ДОДАНО: плавний перехід кольору */
    transition: var(--transition);
  }

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
    font-weight: 700;
    /* ЗМІНЕНО: колір заголовка тепер динамічний */
    color: var(--text-color);
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
    /* ЗМІНЕНО: колір тексту абзацу на динамічний (сірий для темної теми) */
    color: var(--text-secondary-color);
  }

  .btn {
    margin-top: 1rem;
    width: 100%;
  }

  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
    cursor: pointer;
    font-weight: 600;
  }

  .form-row {
    margin-bottom: 1rem;
    text-align: left;
  }
`;

export default Wrapper;
