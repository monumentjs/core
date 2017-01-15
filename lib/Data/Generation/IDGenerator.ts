const MAX_LOOPS: number = 10;
const MAX_SAFE_INTEGER: number = Math.pow(2, 53) - 1;


export default class IDGenerator {
    private _takenIDs: {[key: number]: boolean};


    constructor() {
        this._takenIDs = Object.create(null);
    }


    public generate(loopsLimit: number = MAX_LOOPS): number {
        let id: number;
        let loop: number = 0;

        do {
            id = Math.round(Math.random() * MAX_SAFE_INTEGER);
            loop++;

            if (loop >= loopsLimit) {
                break;
            }
        } while (id in this._takenIDs);

        this._takenIDs[id] = true;

        return id;
    }


    public free(id: number): boolean {
        if (id in this._takenIDs) {
            delete this._takenIDs[id];
            return true;
        } else {
            return false;
        }
    }
}