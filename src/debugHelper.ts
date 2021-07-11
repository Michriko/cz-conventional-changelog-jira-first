import inquirer from 'inquirer';
import { prompter } from './index';
import { inverse, yellow } from 'chalk';

function printCommitMessage(template: string): void {
    console.debug(yellow.bold('\n\n\nYour commit message would be:'));
    console.debug(inverse.bold(template));
}

prompter(inquirer, (errorOrTemplate: Error | string) => {
    if (!(errorOrTemplate instanceof Error)) {
        printCommitMessage(errorOrTemplate);
    } else {
        console.error(errorOrTemplate);
    }
});
