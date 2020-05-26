"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structure = void 0;
/**
 * The base class for Structures
 */
class Structure {
    // eslint-disable-next-line no-useless-constructor
    constructor(client) {
        this.client = client;
    }
    /**
     * Basic clone method
     */
    clone() {
        return Object.assign(Object.create(this), this);
    }
    /**
     * The basic value of this Structure
     */
    valueOf() {
        return this.id;
    }
    /**
     * The JSON representation of this object.
     */
    toJSON() {
        const returnValue = {};
        for (const [key, value] of Object.entries(this))
            if (key !== 'client')
                Reflect.set(returnValue, key, (value === null || value === void 0 ? void 0 : value.id) || value);
        return returnValue;
    }
}
exports.Structure = Structure;
//# sourceMappingURL=Structure.js.map