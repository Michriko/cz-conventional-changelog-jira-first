import type { ICommitizenConfig } from 'commitizen';
import { configLoader } from 'commitizen';
import type { Inquirer } from 'inquirer';
import { defaults } from 'lodash';
import { Adapter } from './Adapter';
import { defaultConfiguration } from './defaults/CommitizenConfig';

const config: ICommitizenConfig = defaults(defaultConfiguration, configLoader.load());
const adapter = new Adapter(config);

export function prompter(
    inquirer: Inquirer,
    commit: (
        errorOrTemplate: Error | string,
        templateOrOverrideOptions?: string | unknown,
        overrideOptions?: unknown,
    ) => unknown,
): Promise<void> {
    return adapter.prompter(inquirer, commit);
}
