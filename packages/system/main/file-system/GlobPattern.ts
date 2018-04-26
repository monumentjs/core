import {EMPTY_STRING} from '@monument/core/main/constants';
import {Assert} from '@monument/assert/main/Assert';
import {PathPattern} from './PathPattern';


export class GlobPattern extends PathPattern {
    public static toRegularExpression(glob: string, ignoreCase: boolean = false): RegExp {
        let insideCharacterRange: boolean = false;
        let expression: string = EMPTY_STRING;

        for (let index = 0; index < glob.length; index++) {
            let previousLetter: string = glob[index - 1];
            let currentLetter: string = glob[index];
            let nextLetter: string = glob[index + 1];

            switch (currentLetter) {
                case '\\':
                case '/':
                    if (previousLetter !== '\\' && previousLetter !== '/') {
                        expression += '/';
                    }

                    break;

                case '*':
                    if (insideCharacterRange) {
                        expression += '\\' + currentLetter;
                    } else {
                        if (nextLetter === '*') {               // **
                            expression += '.*';
                            index += 1;
                            if (glob[index + 1] === '/' || glob[index + 1] === '\\') {
                                index += 1;
                            }
                        } else {                                // *
                            expression += '[^/]*';
                        }
                    }

                    break;

                case '?':
                    if (!insideCharacterRange) {
                        expression += '[^/]';
                    } else {
                        expression += '\\' + currentLetter;
                    }

                    break;

                case '[':
                    if (!insideCharacterRange) {
                        insideCharacterRange = true;
                    } else {
                        expression += '\\' + currentLetter;
                        break;
                    }

                    if (nextLetter === '!') {
                        expression += '[^';
                        index++;
                    } else {
                        expression += currentLetter;
                    }

                    break;

                case ']':
                    if (insideCharacterRange && previousLetter !== '\\') {
                        insideCharacterRange = false;
                    }

                    expression += currentLetter;

                    break;

                case '.':
                case '+':
                case '^':
                case '$':
                case '|':
                case '(':
                case ')':
                    if (insideCharacterRange) {
                        expression += currentLetter;
                    } else {
                        expression += '\\' + currentLetter;
                    }

                    break;

                default:
                    expression += currentLetter;
            }
        }

        expression = `^${expression}$`;

        return new RegExp(expression, ignoreCase ? 'i' : '');
    }


    public constructor(glob: string, ignoreCase: boolean = false) {
        Assert.argument('glob', glob).notEmptyString();

        super(GlobPattern.toRegularExpression(glob, ignoreCase));
    }
}
