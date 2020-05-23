import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNumberOfCookies, State } from "../state";
import cookie from "../assets/perfectCookie.png";
import { Building, BuildingType } from "../state/buildings";

function Index() {
  const dispatch = useDispatch();
  const numberOfCookies = useNumberOfCookies();
  const cookiesPerSecond = useSelector(
    (state: State) => Math.round(state.cookiesPerSecond * 10) / 10
  );

  return (
    <div>
      <h1>{numberOfCookies} cookies</h1>
      <div>per second: {cookiesPerSecond}</div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        <img src={cookie}></img>
      </button>

      <CookieStore />
    </div>
  );
}

const CookieStore = () => {
  return (
    <div>
      <BuyableBuilding
        type={BuildingType.CURSOR}
        price={15}
        numberOfBuildingsOwned={0}
      />
      <BuyableBuilding
        type={BuildingType.GRANDMA}
        price={100}
        numberOfBuildingsOwned={0}
      />
    </div>
  );
};

const BuyableBuilding: React.FunctionComponent<Building> = ({
  type,
  numberOfBuildingsOwned,
  price,
}) => {
  const numberOfCookies = useNumberOfCookies();
  const dispatch = useDispatch();
  const buyBuilding = () =>
    dispatch({ type: "BUY_BUILDING", payload: { type, price } });

  return (
    <div style={{ backgroundColor: "gray", margin: "10px" }}>
      <div>{type}</div>
      <div>Price: {price}</div>
      {numberOfCookies >= price && <button onClick={buyBuilding}>Buy</button>}
      <div>{numberOfBuildingsOwned}</div>
    </div>
  );
};

export default Index;
