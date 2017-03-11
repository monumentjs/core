import Exception from './Exception';


export default class IndexOutOfBoundsException extends Exception {
    public readonly index: number;
    public readonly min: number;
    public readonly max: number;
    
    
    public constructor(index: number, min: number, max: number) {
        super(`Index (${index}) out of bounds [${min}...${max}]`);
        
        this.index = index;
        this.min = min;
        this.max = max;
    }
}
