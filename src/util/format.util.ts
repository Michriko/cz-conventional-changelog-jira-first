import { compact } from 'lodash';
import type { IOptions } from '../../node_modules/word-wrap/index';
import wrap from '../../node_modules/word-wrap/index';
import type { Answers } from '../models/answers.model';

export function headerLength(answers: Answers): number {
    const typeLength = (answers.type?.length ?? 0) + 2;
    const scopeLength = (answers.scope?.length ?? 0) + 2;
    return typeLength + scopeLength;
}

export function maxSubjectLength(answers: Answers, maxHeaderWidth: number): number {
    return maxHeaderWidth - headerLength(answers);
}

export function formatSubject(subject: string, disableSubjectToLowerCase?: boolean): string {
    let formatted = subject.trim();
    if (!disableSubjectToLowerCase) {
        formatted = formatted.charAt(0).toLowerCase() + formatted.slice(1, formatted.length);
    }
    while (formatted.endsWith('.')) {
        formatted = formatted.slice(0, subject.length - 1);
    }
    return formatted;
}

export function formatCommitMessage(answers: Answers, maxLineWidth: number): string {
    const wrapOptions: IOptions = {
        trim: true,
        cut: false,
        newline: '\n',
        indent: '',
        width: maxLineWidth,
    };
    const scope = answers.scope ? `(${answers.scope}):` : '';
    const head = `${answers.jira}: ${answers.type}: ${scope} ${answers.subject}`;
    const body = wrap((answers.body ?? answers.breakingBody ?? answers.issueBody)!, wrapOptions);
    const breaking = !answers.isBreaking ? false : wrap(`BREAKING CHANGE: ${answers.breaking?.trim()}`, wrapOptions);
    const issues = answers.isIssueAffected ? wrap(answers.issueReference!.trim(), wrapOptions) : false;
    return compact([head, body, breaking, issues]).join('\n\n');
}
