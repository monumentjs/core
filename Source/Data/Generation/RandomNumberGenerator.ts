import {Singleton} from '../../DI/Decorators/Singleton';


@Singleton()
export class RandomNumberGenerator {
    public generateInteger(from: number, to: number): number {
        return Math.floor(this.generateFloat(from, to));
    }


    public generateFloat(from: number, to: number): number {
        return from + Math.random() * to;
    }
}
