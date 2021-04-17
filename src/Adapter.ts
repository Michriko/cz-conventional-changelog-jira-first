import { IAdapter, ICommitizenConfig } from "commitizen";
import { sync } from "git-branch";
import {
  InputQuestion,
  Inquirer,
  ListQuestion,
  QuestionCollection,
} from "inquirer";
import { max } from "lodash";

enum Step {
  Jira = "jira",
  Type = "type",
  Scope = "scope",
  Subject = "subject",
  Body = "body",
  IsBreaking = "isBreaking",
  BreakingBody = "breakingBody",
  Breaking = "breaking",
  IsIssueAffected = "isIssueAffected",
  IssueBody = "issueBody",
  IssueReference = "issueReference",
}

export class Adapter implements IAdapter {
  constructor(private readonly configuration: ICommitizenConfig) {}

  async prompter(
    inquirer: Inquirer,
    commit: (
      error: Error | null,
      template: string,
      overrideOptions?: unknown
    ) => unknown
  ): Promise<void> {
    const questions: QuestionCollection = [
      this.jiraQuestion(),
      this.typeQuestion(),
    ];

    inquirer.prompt(questions);

    commit(null, "test");
  }

  private jiraQuestion(): InputQuestion {
    const branchName = sync();
    const matched = branchName.match(
      /(?<jiraIssue>(?<!([A-Z0-9]{1,10})-?)[A-Z0-9]+-\d+)/
    );
    const defaultJiraIsse =
      (matched && matched.groups && matched.groups["jiraIssue"]) ?? "";

    return {
      name: Step.Jira,
      message: "Enter JIRA issue (e.g. BLA-123) :",
      default: defaultJiraIsse,
      validate: (input: string) =>
        /^(?<!([A-Z0-9]{1,10})-?)[A-Z0-9]+-\d+$/.test(input),
      filter: (input: string) => input.toUpperCase(),
    };
  }

  private typeQuestion(): ListQuestion {
    const length =
      max(
        Object.values(this.configuration.types!).map(
          (type) => type.title.length
        )
      )! + 1;
    const choices: { name: string; value: string }[] = Object.entries(
      this.configuration.types!
    ).map(([key, value]) => ({
      name: `${value.title.padEnd(length)}${value.description}`,
      value: key,
    }));

    return {
      name: Step.Type,
      type: "list",
      choices,
      default: this.configuration.defaultType,
      message: "Select the type of change that you're committing:",
    };
  }
}
