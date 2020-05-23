import React from "react";
import { useDispatch } from "react-redux";
import { useNumberOfCookies } from "../state";
import { Building, BuildingType } from "../state/buildings";

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

  return (
    <div style={{ backgroundColor: "gray", margin: "10px" }}>
      <div>{type}</div>
      <div>Price: {price}</div>
      {numberOfCookies >= price && (
        <button
          onClick={() =>
            dispatch({ type: "BUY_BUILDING", payload: { type, price } })
          }
        >
          Buy
        </button>
      )}
      <div>{numberOfBuildingsOwned}</div>
    </div>
  );
};

export default CookieStore;
