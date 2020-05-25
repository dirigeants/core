"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overwrite = void 0;
const Permissions_1 = require("../../../util/bitfields/Permissions");
const Structure_1 = require("../base/Structure");
/**
 * @see https://discord.com/developers/docs/resources/channel#overwrite-object
 */
class Overwrite extends Structure_1.Structure {
    constructor(client, data, channel) {
        super(client);
        /**
         * If the overwrite has been deleted.
         * @since 0.0.1
         */
        this.deleted = false;
        this.id = data.id;
        this.type = data.type;
        this.channel = channel;
        this._patch(data);
    }
    /**
     * Deletes this overwrite.
     * @param requestOptions The additional request options.
     */
    async delete(requestOptions = {}) {
        await this.channel.permissionOverwrites.remove(this.id, requestOptions);
        return this;
    }
    /**
     * Modifies this overwrite.
     * @param options The modify options
     * @param requestOptions The additional request options.
     */
    async modify(options, requestOptions = {}) {
        var _a, _b;
        const data = {
            type: this.type,
            allow: (_a = options.allow) !== null && _a !== void 0 ? _a : this.allow.bitfield,
            deny: (_b = options.deny) !== null && _b !== void 0 ? _b : this.deny.bitfield
        };
        await this.channel.permissionOverwrites.add(this.id, data, requestOptions);
        return this._patch(data);
    }
    _patch(data) {
        this.allow = new Permissions_1.Permissions(data.allow).freeze();
        this.deny = new Permissions_1.Permissions(data.deny).freeze();
        return this;
    }
}
exports.Overwrite = Overwrite;
//# sourceMappingURL=Overwrite.js.map