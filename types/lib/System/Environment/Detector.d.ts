export declare enum EnvironmentID {
    Unknown = 0,
    Browser = 1,
    Node = 2,
}
export declare class Detector {
    readonly isBrowser: boolean;
    readonly isNode: boolean;
    constructor();
    detect(): EnvironmentID;
    protected detectBrowser(): boolean;
    protected detectNode(): boolean;
}
declare var _default: Detector;
export default _default;
