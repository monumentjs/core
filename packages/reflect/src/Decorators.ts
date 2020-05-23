export class Decorators implements Iterable<Function> {
  private readonly decorators = new Set<Function>();

  get count(): number {
    return this.decorators.size;
  }

  attach(decorator: Function): void {
    this.decorators.add(decorator);
  }

  has(decorator: Function): boolean {
    return this.decorators.has(decorator);
  }

  [Symbol.iterator](): Iterator<Function> {
    return this.decorators[Symbol.iterator]();
  }
}
