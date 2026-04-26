import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Щомісячні заявки</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? `Діаграма площі` : `Стовпчаста діаграма`}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
