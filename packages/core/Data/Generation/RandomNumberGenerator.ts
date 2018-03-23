

export class RandomNumberGenerator {
    public static getFloat(from: number, to: number): number {
        return from + Math.random() * to;
    }


    public static getInteger(from: number, to: number): number {
        return Math.floor(this.getFloat(from, to));
    }


    public static getByte(): number {
        return this.getInteger(0, 256);
    }
}
