declare module 'conventional-commit-types' {
    export interface CommitType {
        description: string;
        title: string;
    }
    export interface CommitTypeLookUp {
        [key: string]: CommitType;
    }

    declare const types: CommitTypeLookUp;
}
