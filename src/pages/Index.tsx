import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNumberOfCookies, State } from "../state";
import cookie from "../assets/perfectCookie.png";
import { Building, BuildingType } from "../state/buildings";
import { abbreviateNumber } from "../abbreviate-number";

function Index() {
  const dispatch = useDispatch();
  const numberOfCookies = abbreviateNumber(useNumberOfCookies());

  const cookiesPerSecond = abbreviateNumber(
    useSelector((state: State) => Math.round(state.cookiesPerSecond * 10) / 10)
  );

  return (
    <div className="flex bg-gray-200">
      <div className="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2">
        <h1>{numberOfCookies} cookies</h1>
        <div>per second: {cookiesPerSecond}</div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          <img src={cookie}></img>
        </button>
      </div>
      <div className="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2">
        <CookieStore />
      </div>
    </div>
  );
}

const CookieStore = () => {
  return (
    <div>
      {Object.values(BuildingType).map((buildingType) => (
        <BuyableBuilding key={buildingType} type={buildingType} />
      ))}
    </div>
  );
};

interface BuyableBuildingProps {
  type: BuildingType;
}

const BuyableBuilding: React.FunctionComponent<BuyableBuildingProps> = ({
  type,
}) => {
  const numberOfCookies = useNumberOfCookies();
  const building = useSelector((state: State) => state.buildings[type]);

  const dispatch = useDispatch();
  const buyBuilding = () =>
    dispatch({
      type: "BUY_BUILDING",
      payload: { type: building.type, price: building.price },
    });
  const hasEnoughCookies = numberOfCookies >= building.price;

  return (
    <div
      style={{
        backgroundColor: hasEnoughCookies ? "gray" : "white",
        margin: "10px",
      }}
    >
      <div>{type}</div>
      <div>Price: {abbreviateNumber(building.price)}</div>
      {hasEnoughCookies && <button onClick={buyBuilding}>Buy</button>}
      <div>{building.numberOfBuildingsOwned}</div>
    </div>
  );
};

export default Index;
