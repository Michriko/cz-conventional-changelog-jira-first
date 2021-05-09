import inquirer from 'inquirer';
import { prompter } from './index';
import { inverse, yellow } from 'chalk';

function printCommitMessage(template: string): void {
    console.log(yellow.bold('\n\n\nYour commit message would be:'));
    console.log(inverse.bold(template));
}

prompter(inquirer, (template) => printCommitMessage(template as string));
