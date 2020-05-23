import { AnyAction } from "redux";

export enum BuildingType {
  CURSOR = "CURSOR",
  GRANDMA = "GRANDMA",
}

export interface Building {
  type: BuildingType;
  numberOfBuildingsOwned: number;
  price: number;
}
