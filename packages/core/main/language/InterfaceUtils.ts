

export class InterfaceUtils {
    public static implements(instance: any, _interface: any): boolean {
        return Object.keys(_interface).every((key: string): boolean => {
            const value = _interface[key];

            if (typeof value !== 'symbol') {
                return true;
            }

            return instance[value] !== undefined;
        });
    }

    private constructor() {}
}
