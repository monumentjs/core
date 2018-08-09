

export function Profile(target: object, name: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {

    const method = descriptor.value;

    return {
        value: function () {
            console.log(`${target.constructor.name}.${name.toString()}(${arguments.length})`, arguments);

            return method.apply(this, arguments);
        }
    };
}
