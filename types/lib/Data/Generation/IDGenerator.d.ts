export default class IDGenerator {
    private _takenIDs;
    constructor();
    generate(loopsLimit?: number): number;
    free(id: number): boolean;
}
