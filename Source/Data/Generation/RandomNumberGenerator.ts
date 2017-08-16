import {Singleton} from '../../DI/Decorators/Singleton';


@Singleton()
export class RandomNumberGenerator {
    public getFloat(from: number, to: number): number {
        return from + Math.random() * to;
    }


    public getInteger(from: number, to: number): number {
        return Math.floor(this.getFloat(from, to));
    }


    public getByte(): number {
        return this.getInteger(0, 256);
    }
}
