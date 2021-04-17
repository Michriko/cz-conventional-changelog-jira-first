import { ICommitizenConfig } from "commitizen";
import { types } from "conventional-commit-types";

export const defaultConfiguration: ICommitizenConfig = {
  types,
  maxHeaderWidth: 100,
  maxLineWidth: 100,
  defaultType: "feat",
};
