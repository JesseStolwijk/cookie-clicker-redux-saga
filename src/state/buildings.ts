import { AnyAction } from "redux";

export enum BuildingType {
  CURSOR = "CURSOR",
  GRANDMA = "GRANDMA",
  FARM = "FARM",
  MINE = "MINE",
  FACTORY = "FACTORY",
  BANK = "BANK",
  TEMPLE = "TEMPLE",
  WIZARD_TOWER = "WIZARD_TOWER",
  SHIPMENT = "SHIPMENT",
  ALCHEMY_LAB = "ALCHEMY_LAB",
  PORTAL = "PORTAL",
  TIME_MACHINE = "ITME_MACHINE",
  ANTIMATTER_CONDENSER = "ANTIMATTER_CONDENSER",
  PRISM = "PRISM",
  CHANCEMAKER = "CHANCEMAKER",
  FRACTAL_ENGINE = "FRACTAL_ENGINE",
  JAVASCRIPT_CONSOLE = "JAVASCRIPT_CONSOLE",
}

export interface Building {
  type: BuildingType;
  numberOfBuildingsOwned: number;
  price: number;
  basePrice: number;
  baseCookiesPerSecond: number;
}
