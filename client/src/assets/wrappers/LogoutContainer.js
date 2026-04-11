import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    /* Додаємо плавний перехід для самої кнопки */
    transition: var(--transition);
  }

  .logout-btn:hover {
    box-shadow: var(--shadow-3);
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    /* Додаємо обводку, щоб фото не зливалося з фоном */
    border: 1px solid var(--white);
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    background: var(--primary-500);
    box-shadow: var(--shadow-2);
    text-align: center;
    border-radius: var(--border-radius);

    /* ПОКРАЩЕННЯ: Плавна поява замість різкого visibility */
    visibility: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease-in-out;

    /* Щоб випадаюче меню було над іншим контентом */
    z-index: 10;
    overflow: hidden;
  }

  .show-dropdown {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown-btn {
    width: 100%;
    padding: 0.75rem 0.5rem; /* Трохи більше простору */
    background: transparent;
    border: none;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    display: block;
    transition: var(--transition);
  }

  /* Ефект при наведенні на кнопку в меню */
  .dropdown-btn:hover {
    background: var(--primary-700);
    color: var(--white);
  }
`;

export default Wrapper;
