import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
import styled from "styled-components";

const Spacer = styled.div`
  background-color: transparent;
  height: 30px;
`;

function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
      <Spacer />
    </Fragment>
  );
}

export default Meals;