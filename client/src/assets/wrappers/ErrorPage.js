import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  /* Використовуємо динамічний фон проекту */
  background: var(--background-color);

  img {
    width: 100%;
    max-width: 500px;
    display: block;
    margin-bottom: 3rem;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.02);
    }
  }

  h3 {
    margin-bottom: 1rem;
    font-size: clamp(1.5rem, 5vw, 2.25rem);
    /* Використовуємо динамічний колір тексту */
    color: var(--text-color);
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    line-height: 1.6;
    margin-top: 0;
    margin-bottom: 2rem;
    /* Колір для другорядного тексту (сіруватий в обох темах) */
    color: var(--text-secondary-color);
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }

  a {
    display: inline-block;
    background: var(--primary-500);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius); /* Використовуємо глобальний радіус */
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
    transition: var(--transition);
    box-shadow: var(--shadow-2); /* Використовуємо глобальну тінь */

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
      box-shadow: var(--shadow-3);
      color: var(--white);
    }
  }
`;

export default Wrapper;
