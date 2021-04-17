import { configLoader, ICommitizenConfig } from "commitizen";
import { defaults } from "lodash";
import { Adapter } from "./Adapter";
import { defaultConfiguration } from "./defaults/CommitizenConfig";

const config: ICommitizenConfig = defaults(
  defaultConfiguration,
  configLoader.load()
);
export default new Adapter(config);
