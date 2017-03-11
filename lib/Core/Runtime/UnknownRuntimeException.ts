import Exception from '../Exceptions/Exception';


export default class UnknownRuntimeException extends Exception {
    public readonly helpInfo: string = `Unable to identify current runtime.`;
}
