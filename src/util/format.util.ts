import { compact } from 'lodash';
import wrap from 'word-wrap/index';
import type { Answers } from '../models/answers.model';

export function headerLength(answers: Answers): number {
    return formatHeader(answers).length;
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
    const wrapOptions: wrap.IOptions = {
        trim: true,
        cut: false,
        newline: '\n',
        indent: '',
        width: maxLineWidth,
    };

    const head = formatHeader(answers);
    const body = wrap((answers.body ?? answers.breakingBody ?? answers.issueBody)!, wrapOptions);
    const breaking = answers.isBreaking ? wrap(`BREAKING CHANGE: ${answers.breaking?.trim()}`, wrapOptions) : false;
    const issues = answers.isIssueAffected ? wrap(answers.issueReference!.trim(), wrapOptions) : false;
    return compact([head, body, breaking, issues]).join('\n\n');
}

function formatHeader({ jira, type, scope, subject }: Answers): string {
    const formattedIssue = jira ? `${jira}: ` : '';
    const formattedScope = scope ? `(${scope})` : '';
    const formattedSubject = subject ?? '';

    return `${formattedIssue}${type}${formattedScope}: ${formattedSubject}`;
}
