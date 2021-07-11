declare module 'commitizen' {
    import type { Inquirer } from 'inquirer';
    import type { CommitTypeLookUp } from 'conventional-commit-types';

    export type Commit = ((error: Error, template: string, overrideOptions?: unknown) => unknown) &
        ((template: string, overrideOptions?: unknown) => unknown);

    export interface IConfigLoader {
        load: () => ?ICommitizenConfig;
    }
    export interface ICommitizenConfig {
        path?: string;
        types: CommitTypeLookUp;
        defaultType?: string;
        defaultScope?: string;
        defaultSubject?: string;
        defaultBody?: string;
        defaultIssues?: string;
        disableScopeToLowerCase?: boolean;
        disableSubjectLowerCase?: boolean;
        maxLineWidth: number;
        maxHeaderWidth: number;
    }
    export interface IAdapter {
        prompter: (inquirer: Inquirer, commit: Commit) => void;
    }
    declare const configLoader: IConfigLoader;
}
