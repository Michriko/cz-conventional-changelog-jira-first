declare module 'commitizen' {
    import type { Inquirer } from 'inquirer';
    import type { CommitTypeLookUp } from 'conventional-commit-types';

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
        prompter: (
            inquirer: Inquirer,

            /**
             * This is a little hacky!
             * The first parameter, the error, is optional. If there is no error,
             * the first parameter is the template and the second one beckomes the overrideOptions
             * @param errorOrTemplate error of type Error, otherwise the template
             * @param templateOrOverrideOptions if there is an error, this is the template, if there is no error, here should go overrideOptions
             * @param overrideOptions only used, when there is an error, then here goes the override options.
             */
            commit: (
                errorOrTemplate: Error | string,
                templateOrOverrideOptions?: string | unknown,
                overrideOptions?: unknown,
            ) => unknown,
        ) => void;
    }
    declare const configLoader: IConfigLoader;
}
