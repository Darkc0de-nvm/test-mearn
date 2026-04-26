import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: `Заявки на розгляді`,
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: `#f59e0b`,
      bcg: `#fef3c7`,
    },
    {
      title: `Назначено інтерв'ю`,
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: `#647acb`,
      bcg: `#e0e8f9`,
    },
    {
      title: `Заявок відхилено`,
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: `#d66a6a`,
      bcg: `#ffeeee`,
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
