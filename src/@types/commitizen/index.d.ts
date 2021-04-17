declare module "commitizen" {
  import { Inquirer } from "inquirer";
  import { CommitTypeLookUp } from "conventional-commit-types";

  export interface IConfigLoader {
    load: () => ?ICommitizenConfig;
  }
  export interface ICommitizenConfig {
    path?: string;
    types?: CommitTypeLookUp;
    defaultType?: string;
    defaultScope?: string;
    defaultSubject?: string;
    defaultBody?: string;
    defaultIssues?: string;
    disableScopeToLowerCase?: boolean;
    disableSubjectLowerCase?: boolean;
    maxLineWidth?: number;
    maxHeaderWidth?: number;
  }
  export interface IAdapter {
    prompter: (
      inquirer: Inquirer,
      commit: (
        error: Error | null,
        template: string,
        overrideOptions?: unknown
      ) => unknown
    ) => void;
  }
  declare const configLoader: IConfigLoader;
}
