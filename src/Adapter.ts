import { IAdapter, ICommitizenConfig } from "commitizen";
import { sync } from "git-branch";
import {
  ConfirmQuestion,
  InputQuestion,
  Inquirer,
  ListQuestion,
  QuestionCollection,
} from "inquirer";
import { max } from "lodash";
import { Chalk, red, green } from "chalk";
import { Answers } from "./models/answers.model";
import { Step } from "./models/step.enum";
import {
  formatCommitMessage,
  formatSubject,
  headerLength,
  maxSubjectLength,
} from "./util/format.util";

export class Adapter implements IAdapter {
  constructor(private readonly configuration: ICommitizenConfig) {}

  async prompter(
    inquirer: Inquirer,
    commit: (
      errorOrTemplate: Error | string,
      templateOrOverrideOptions?: string | unknown,
      overrideOptions?: unknown
    ) => unknown
  ): Promise<void> {
    const questions: QuestionCollection = [
      this.jiraQuestion(),
      this.typeQuestion(),
      this.scopeQuestion(),
      this.subjectQuestion(),
      this.bodyQuestion(),
      this.isBreakingQuestion(),
      this.breakingBodyQuestion(),
      this.breakingQuestion(),
      this.issueAffectedQuestion(),
      this.issueBodyQuestion(),
      this.issuesQuestion(),
    ];

    const answers: Answers = await inquirer.prompt(questions);

    commit(formatCommitMessage(answers, this.configuration.maxLineWidth!));
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

  private scopeQuestion(): InputQuestion {
    return {
      name: Step.Scope,
      message:
        "What is the scope of this change (e.g. component or file name): (press enter to skip)",
      default: this.configuration.defaultScope,
      filter: (input: string) =>
        this.configuration.disableScopeToLowerCase
          ? input.trim()
          : input.trim().toLowerCase(),
    };
  }

  private subjectQuestion(): InputQuestion {
    return {
      name: Step.Subject,
      message: (answers: Answers) =>
        `Write a short, imperative tense description of the change (max. ${
          this.configuration.maxHeaderWidth! - headerLength(answers)
        } chars)`,
      default: this.configuration.defaultSubject,
      validate: (subject: string, answers: Answers) => {
        const formatted = formatSubject(
          subject,
          this.configuration.disableSubjectLowerCase!
        );
        if (!formatted.length) {
          return "Subject is required";
        }
        const prefixlength = headerLength(answers);
        const currentHeaderLength = prefixlength + formatted.length + 2;
        if (currentHeaderLength > this.configuration.maxHeaderWidth!) {
          return `Subject length must be less than or equal to ${
            this.configuration.maxHeaderWidth! - prefixlength
          } caharcters. Current length is ${formatted.length}.`;
        }
        return true;
      },
      transformer: (subject: string, answers: Answers) => {
        const formatted = formatSubject(
          subject,
          this.configuration.disableSubjectLowerCase!
        );
        const color: Chalk =
          formatted.length <=
          maxSubjectLength(answers, this.configuration.maxHeaderWidth!)
            ? green
            : red;
        return color(`(${formatted.length})` + subject);
      },
      filter: (subject: string) =>
        formatSubject(subject, this.configuration.disableSubjectLowerCase!),
    };
  }

  private bodyQuestion(): InputQuestion {
    return {
      name: Step.Body,
      message:
        "Provide a longer description of the change: (press enter to skip) \n",
      default: this.configuration.defaultBody,
    };
  }

  private isBreakingQuestion(): ConfirmQuestion {
    return {
      type: "confirm",
      name: Step.IsBreaking,
      message: "Are there any breaking changes?",
      default: false,
    };
  }

  private breakingBodyQuestion(): InputQuestion {
    return {
      name: Step.BreakingBody,
      message:
        "A breaking change commit requires a body. Please enter a longer description of the commit itself:\n",
      default: "-",
      when: (answers: Answers) => !!answers.isBreaking && !answers.body,
      validate: (breakingBody: string) =>
        breakingBody.trim().length > 0 ||
        "Body is required for breaking changes.",
    };
  }

  private breakingQuestion(): InputQuestion {
    return {
      name: Step.Breaking,
      message: "Describe the breaking changes: \n",
      when: (answers: Answers) => !!answers.isBreaking,
    };
  }

  private issueAffectedQuestion(): ConfirmQuestion {
    return {
      type: "confirm",
      name: Step.IsIssueAffected,
      message: "Does this change affect any open issues?",
    };
  }

  private issueBodyQuestion(): InputQuestion {
    return {
      name: Step.IssueBody,
      default: "-",
      message:
        "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself: \n",
      when: (answers: Answers) =>
        !!answers.isIssueAffected && !answers.body && !answers.breakingBody,
    };
  }
  private issuesQuestion(): InputQuestion {
    return {
      name: Step.IssueReference,
      message: 'Add issue references (e. g. "fix #123", "re #123"):\n',
      when: (answers: Answers) => !!answers.isIssueAffected,
      default: this.configuration.defaultIssues,
    };
  }
}
