import {ICustomParser} from '../../Core/types';
import Command from './Command';


export const COMMAND_PATTERN: RegExp = /^(\w+)(\s+(\w+)(\s+(.+))?)?$/;


export default class CommandParser implements ICustomParser<Command> {
    public parse(value: string): Command {
        return undefined;
    }

}
