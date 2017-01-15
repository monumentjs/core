import { PhraseToken } from '../types';
export declare abstract class LocalizedError extends Error {
    constructor(token: PhraseToken, ...args: any[]);
}
