import {PathPattern} from './PathPattern';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {InvalidArgumentException} from '../../Core/Exceptions/InvalidArgumentException';


export class GlobPattern extends PathPattern {
    public static toRegularExpression(glob: string, ignoreCase: boolean = false): RegExp {
        assertArgumentNotNull('glob', glob);
        assertArgumentNotNull('ignoreCase', ignoreCase);

        if (glob.length < 1) {
            throw new InvalidArgumentException(`Glob pattern can not be an empty string.`);
        }

        let insideCharacterRange: boolean = false;
        let expression: string = '';

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
        super(GlobPattern.toRegularExpression(glob, ignoreCase));
    }
}
