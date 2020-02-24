import { isClass } from '@klasa/utils'

export class Extender<K, V, VConstructor extends Class<V>> extends Map<K, VConstructor> {
    public set(key: K, value: VConstructor): this {
        if (this.has(key)) throw new Error(`The structure ${key} is already present in this Extender.`);
        return super.set(key, value);
    }

    public extend<S extends VConstructor>(name: K, extender: S): S;
    public extend<S extends VConstructor>(name: K, extender: (value: VConstructor) => S): S;
    public extend<S extends VConstructor>(name: K, extender: ((value: VConstructor) => S) | S): S {
        const structure: VConstructor | undefined = this.get(name);
        if (typeof structure === 'undefined') throw new RangeError(`"${name}" is not a valid extensible structure.`);
        const extensionFunction: (value: VConstructor) => S = isClass(extender) ? () => (extender as S) : (extender as (value: VConstructor) => S);

        const extended = extensionFunction(structure);

        if (typeof extended !== 'function') throw new TypeError(`The extender function must return the extended structure class/prototype`);

        if (!(extended.prototype instanceof structure)) {
            throw new TypeError(`The extender function must return the prototype of the class that was extended.`);
        }

        super.set(name, extended);
        return extended;
    }
}

export interface Class<C> {
    new(...args: unknown[]): C;
    readonly prototype: C;
}
