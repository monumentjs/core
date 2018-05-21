import {FileStartMessage} from './FileStartMessage';
import {FileEndMessage} from './FileEndMessage';
import {ReportMessage} from './ReportMessage';

export type ProcessMessages = FileStartMessage | FileEndMessage | ReportMessage;
