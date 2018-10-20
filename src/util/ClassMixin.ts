/**
 * Makes a mixin from multiple classes to a single one
 * @param constructors The classes to pass
 */
export function mixin(...constructors: (new (...args) => any)[]): ClassDecorator {
	return function applyMixin<TFunction extends Function>(derivedCtor: TFunction): TFunction | void {
		for (const ctor of constructors) {
			for (const name of Object.getOwnPropertyNames(ctor.prototype)) {
				derivedCtor.prototype[name] = ctor.prototype[name];
			}
		}
	};
}
