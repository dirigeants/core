"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMember = void 0;
/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-members-object
 */
class TeamMember {
    constructor(client, data) {
        this.client = client;
        this.membershipState = data.membership_state;
        this.permissions = data.permissions;
        this.id = data.user.id;
    }
    /**
     * The {@link User} this represents.
     * @since 0.0.1
     */
    get user() {
        var _a;
        return (_a = this.client.users.get(this.id)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Defines toString behavior for members.
     * @since 0.0.1
     */
    toString() {
        return `<@${this.id}>`;
    }
}
exports.TeamMember = TeamMember;
//# sourceMappingURL=TeamMember.js.map