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
        // eslint-disable-next-line dot-notation
        this.user = this.client.users['_add'](data.user);
    }
    /**
     * The {@link User} ID.
     * @since 0.0.1
     */
    get id() {
        return this.user.id;
    }
    /**
     * Defines toString behavior for team members.
     * @since 0.0.1
     */
    toString() {
        return this.user.toString();
    }
}
exports.TeamMember = TeamMember;
//# sourceMappingURL=TeamMember.js.map