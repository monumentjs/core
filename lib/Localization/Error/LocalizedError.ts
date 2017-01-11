import LocalizationService from '../LocalizationService';
import {PhraseToken, Phrase} from '../types';


export abstract class LocalizedError extends Error {
    constructor(token: PhraseToken, ...args: any[]) {
        let message: Phrase = LocalizationService.translate(token, ...args);

        super(message);
    }
}
