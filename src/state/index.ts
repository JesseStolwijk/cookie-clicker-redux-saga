import { AnyAction } from "redux";
import { useSelector } from "react-redux";
import { Building, BuildingType } from "./buildings";

export const reducer = (
  state: State = {
    numberOfCookies: 0,
    cookiesPerSecond: 0,
    buildings: [
      { type: BuildingType.CURSOR, numberOfBuildingsOwned: 0, price: 0 },
    ],
  },
  action: AnyAction
): State => {
  console.log("Recuder called with action: ", action);
  switch (action.type) {
    case "INCREMENT":
      return { ...state, numberOfCookies: state.numberOfCookies + 1 };
    case "INCREMENT_BY":
      return {
        ...state,
        numberOfCookies: state.numberOfCookies + action.value,
      };
    case "DECREMENT_BY":
      return {
        ...state,
        numberOfCookies: state.numberOfCookies - action.value,
      };
    case "INCREMENT_NUMBER_OF_BUILDINGS":
      const targetBuilding: Building | undefined = state.buildings.find(
        (building) => building.type === action.buildingType
      );

      if (!targetBuilding) {
        return state;
      }

      return {
        ...state,
        buildings: [
          ...state.buildings,
          {
            ...targetBuilding,
            numberOfBuildingsOwned: targetBuilding.numberOfBuildingsOwned + 1,
          },
        ],
      };
    case "INCREMENT_COOKIES_PER_SECOND_BY":
      return {
        ...state,
        cookiesPerSecond: state.cookiesPerSecond + action.value,
      };
    default:
      return state;
  }
};

export const useNumberOfCookies = () =>
  useSelector((state: State) => Math.floor(state.numberOfCookies));

export interface State {
  numberOfCookies: number;
  cookiesPerSecond: number;
  buildings: Building[];
}
