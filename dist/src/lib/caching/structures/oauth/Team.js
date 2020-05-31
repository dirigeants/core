"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const cache_1 = require("@klasa/cache");
const TeamMember_1 = require("./TeamMember");
/**
 * @see https://discord.com/developers/docs/topics/teams#data-models-team-object
 */
class Team {
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.icon = data.icon;
        this.members = new cache_1.Cache(data.members.map(member => [member.user.id, new TeamMember_1.TeamMember(client, member)]));
        this.ownerID = data.owner_user_id;
    }
    /**
     * The owner of this Team
     * @since 0.0.4
     */
    get owner() {
        return this.members.get(this.ownerID);
    }
}
exports.Team = Team;
//# sourceMappingURL=Team.js.map