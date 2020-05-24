import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNumberOfCookies, State } from "../state";
import Cookie from "../assets/iconmonstr-candy-6.svg";
import { BuildingType } from "../state/buildings";
import { abbreviateNumber } from "../abbreviate-number";

function Index() {
  const dispatch = useDispatch();
  const numberOfCookies = abbreviateNumber(useNumberOfCookies());

  const cookiesPerSecond = abbreviateNumber(
    useSelector((state: State) => Math.round(state.cookiesPerSecond * 10) / 10)
  );

  return (
    <div className="grid grid-flow-row sm:grid-flow-row md:grid-flow-row lg:grid-flow-col xl:grid-flow-col">
      <div className="flex flex-col text-gray-700 max-h-screen content-around text-center px-4 py-2 m-1">
        <div className="text-gray-700 text-center bg-gray-100 px-4 py-2 m-2">
          <h1 className="text-5xl">{numberOfCookies} cookies</h1>
          <p className="text-2xl">per second: {cookiesPerSecond}</p>
        </div>
        <div className="px-4 py-2 m-8">
          <img
            className="transform cursor-pointer hover:scale-110 w-64 fill-curren m-auto"
            onClick={() => dispatch({ type: "INCREMENT" })}
            src={Cookie}
          />
        </div>
      </div>
      <div className="flex-1 text-gray-700 text-center">
        <CookieStore />
      </div>
    </div>
  );
}

const CookieStore = () => {
  return (
    <div className="grid grid-cols-1 max-h-screen lg:overflow-y-scroll xl:overflow-y-scroll">
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
  const hasEnoughCookies = numberOfCookies >= building.price;

  const buyBuilding = () =>
    hasEnoughCookies
      ? dispatch({
          type: "BUY_BUILDING",
          payload: { type: building.type, price: building.price },
        })
      : {};

  const extraClasses = hasEnoughCookies
    ? "hover:bg-gray-200 cursor-pointer"
    : "bg-gray-100 opacity-25";

  return (
    <div
      onClick={buyBuilding}
      className={
        "grid grid-rows-2 grid-flow-col align-middle p-2 select-none items-center " +
        extraClasses
      }
    >
      <div className="row-span-1 col-span-1">
        <p className="font-sans text-lg text-purple-600 text-left capitalize">
          {type.toLowerCase().replace("_", " ")}
        </p>
      </div>
      <div className="row-span-1 col-span-1">
        <div className="text-left">
          Price: {abbreviateNumber(building.price)}
        </div>
      </div>
      <div className="row-span-3">
        <p className="text-xl align-middle text-right font-semibold text-purple-700 text-opacity-50">
          {building.numberOfBuildingsOwned}
        </p>
      </div>
    </div>
  );
};

export default Index;
