
export function times(count: number, fn: (index: number) => void) {
    for (let index = 0; index < count; index++) {
        fn(index);
    }
}
