import { configLoader, ICommitizenConfig } from "commitizen";
import { Inquirer } from "inquirer";
import { defaults } from "lodash";
import { Adapter } from "./Adapter";
import { defaultConfiguration } from "./defaults/CommitizenConfig";

const config: ICommitizenConfig = defaults(
  defaultConfiguration,
  configLoader.load()
);
const adapter = new Adapter(config);

export function prompter(
  inquirer: Inquirer,
  commit: (
    error: Error | null,
    template: string,
    overrideOptions?: unknown
  ) => unknown
): Promise<void> {
  return adapter.prompter(inquirer, commit);
}
