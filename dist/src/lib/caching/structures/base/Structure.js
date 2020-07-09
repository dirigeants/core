"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structure = void 0;
const snowflake_1 = require("@klasa/snowflake");
/**
 * The base class for Structures
 */
class Structure {
    // eslint-disable-next-line no-useless-constructor
    constructor(client) {
        this.client = client;
    }
    /**
     * The Date when this object was created at
     */
    get createdAt() {
        return new snowflake_1.Snowflake(this.id).date;
    }
    /**
     * The time when this object was created at
     */
    get createdTimestamp() {
        return new snowflake_1.Snowflake(this.id).timestamp;
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
        var _a;
        const returnValue = {};
        for (const [key, value] of Object.entries(this))
            if (key !== 'client')
                Reflect.set(returnValue, key, (_a = value === null || value === void 0 ? void 0 : value.id) !== null && _a !== void 0 ? _a : value);
        return returnValue;
    }
}
exports.Structure = Structure;
//# sourceMappingURL=Structure.js.map