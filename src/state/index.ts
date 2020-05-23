import { AnyAction } from "redux";
import { useSelector } from "react-redux";
import { Building, BuildingType } from "./buildings";

const INITIAL_STATE: State = {
  numberOfCookies: 0,
  cookiesPerSecond: 0,
  buildings: {
    [BuildingType.CURSOR]: {
      type: BuildingType.CURSOR,
      numberOfBuildingsOwned: 0,
      price: 15,
      basePrice: 15,
      baseCookiesPerSecond: 0.1,
    },
    [BuildingType.GRANDMA]: {
      type: BuildingType.GRANDMA,
      numberOfBuildingsOwned: 0,
      price: 100,
      basePrice: 100,
      baseCookiesPerSecond: 1,
    },
    [BuildingType.FARM]: {
      type: BuildingType.FARM,
      numberOfBuildingsOwned: 0,
      price: 1100,
      basePrice: 1100,
      baseCookiesPerSecond: 8,
    },
    [BuildingType.MINE]: {
      type: BuildingType.MINE,
      numberOfBuildingsOwned: 0,
      price: 12000,
      basePrice: 12000,
      baseCookiesPerSecond: 47,
    },
    [BuildingType.FACTORY]: {
      type: BuildingType.FACTORY,
      numberOfBuildingsOwned: 0,
      price: 130000,
      basePrice: 130000,
      baseCookiesPerSecond: 260,
    },
    [BuildingType.BANK]: {
      type: BuildingType.BANK,
      numberOfBuildingsOwned: 0,
      price: 1400000,
      basePrice: 1400000,
      baseCookiesPerSecond: 1400,
    },
    [BuildingType.TEMPLE]: {
      type: BuildingType.TEMPLE,
      numberOfBuildingsOwned: 0,
      price: 20000000,
      basePrice: 20000000,
      baseCookiesPerSecond: 7800,
    },
    [BuildingType.WIZARD_TOWER]: {
      type: BuildingType.WIZARD_TOWER,
      numberOfBuildingsOwned: 0,
      price: 330000000,
      basePrice: 330000000,
      baseCookiesPerSecond: 44000,
    },
    [BuildingType.SHIPMENT]: {
      type: BuildingType.SHIPMENT,
      numberOfBuildingsOwned: 0,
      price: 5100000000,
      basePrice: 5100000000,
      baseCookiesPerSecond: 260000,
    },
    [BuildingType.ALCHEMY_LAB]: {
      type: BuildingType.ALCHEMY_LAB,
      numberOfBuildingsOwned: 0,
      price: 75000000000,
      basePrice: 75000000000,
      baseCookiesPerSecond: 1600000,
    },
    [BuildingType.PORTAL]: {
      type: BuildingType.PORTAL,
      numberOfBuildingsOwned: 0,
      price: Math.pow(10, 12),
      basePrice: Math.pow(10, 12),
      baseCookiesPerSecond: 10000000,
    },
    [BuildingType.TIME_MACHINE]: {
      type: BuildingType.TIME_MACHINE,
      numberOfBuildingsOwned: 0,
      price: 14 * Math.pow(10, 12),
      basePrice: 14 * Math.pow(10, 12),
      baseCookiesPerSecond: 65000000,
    },
    [BuildingType.ANTIMATTER_CONDENSER]: {
      type: BuildingType.ANTIMATTER_CONDENSER,
      numberOfBuildingsOwned: 0,
      price: 170 * Math.pow(10, 12),
      basePrice: 170 * Math.pow(10, 12),
      baseCookiesPerSecond: 430000000,
    },
    [BuildingType.PRISM]: {
      type: BuildingType.PRISM,
      numberOfBuildingsOwned: 0,
      price: 2.1 * Math.pow(10, 15),
      basePrice: 2.1 * Math.pow(10, 15),
      baseCookiesPerSecond: 2.9 * Math.pow(10, 9),
    },
    [BuildingType.CHANCEMAKER]: {
      type: BuildingType.CHANCEMAKER,
      numberOfBuildingsOwned: 0,
      price: 26 * Math.pow(10, 15),
      basePrice: 26 * Math.pow(10, 15),
      baseCookiesPerSecond: 21 * Math.pow(10, 9),
    },
    [BuildingType.FRACTAL_ENGINE]: {
      type: BuildingType.FRACTAL_ENGINE,
      numberOfBuildingsOwned: 0,
      price: 310 * Math.pow(10, 15),
      basePrice: 310 * Math.pow(10, 15),
      baseCookiesPerSecond: 150 * Math.pow(10, 9),
    },
    [BuildingType.JAVASCRIPT_CONSOLE]: {
      type: BuildingType.JAVASCRIPT_CONSOLE,
      numberOfBuildingsOwned: 0,
      price: 71 * Math.pow(10, 18),
      basePrice: 71 * Math.pow(10, 18),
      baseCookiesPerSecond: 1.1 * Math.pow(10, 12),
    },
  },
};

export const reducer = (
  state: State = INITIAL_STATE,
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
    case "BUY_BUILDING":
      const targetBuilding: Building | undefined =
        state.buildings[action.payload.type];

      if (!targetBuilding) {
        return state;
      }

      return {
        ...state,
        buildings: {
          ...state.buildings,
          [targetBuilding.type]: {
            ...targetBuilding,
            numberOfBuildingsOwned: targetBuilding.numberOfBuildingsOwned + 1,
            price: Math.ceil(targetBuilding.price * 1.15),
          },
        },
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
  buildings: {
    [buildingType: string]: Building;
  };
}
