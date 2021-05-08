import inquirer from "inquirer";
import Adapter from "./index";
import { inverse, yellow } from "chalk";

function printCommitMessage(_: Error | null, template: string): void {
  console.log(yellow.bold("\n\n\nYour commit message would be:"));
  console.log(inverse.bold(template));
}

Adapter.prompter(inquirer, printCommitMessage);
