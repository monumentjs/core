

export enum EnvironmentID {
    Unknown,
    Browser,
    Node
}


export class Detector {
    public readonly isBrowser: boolean;
    public readonly isNode: boolean;


    constructor() {
        this.isBrowser = this.detectBrowser();
        this.isNode = this.detectNode();
    }


    public detect(): EnvironmentID {
        if (this.isBrowser) {
            return EnvironmentID.Browser;
        } else if (this.isNode) {
            return EnvironmentID.Node;
        } else {
            return EnvironmentID.Unknown;
        }
    }


    protected detectBrowser(): boolean {
        return typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]';
    }


    protected detectNode(): boolean {
        return typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]';
    }
}


export default new Detector();