import ava from 'ava';
import nock = require('nock');
import { RestOptionsDefaults, Routes } from '@klasa/rest';
import { Client, Application, Team, TeamMember } from '../src';

import type { APIUserData, APIOauthData, APITeamData, APITeamMember } from '@klasa/dapi-types';

/* eslint-disable camelcase */

const rawOwner: APIUserData = {
	id: '339942739275677726',
	username: 'team339942739275677726',
	avatar: null,
	discriminator: '0000',
	public_flags: 1024,
	flags: 1024
};

const rawTeamMemberUser: APIUserData = {
	id: '167383252271628288',
	username: 'Owner',
	avatar: '6b26b2972fe980d745dcced464dc7cff',
	discriminator: '0001',
	public_flags: 131840
};

const rawTeamMember: APITeamMember = {
	user: rawTeamMemberUser,
	team_id: '339942739275677726',
	membership_state: 2,
	permissions: ['*']
};

const rawTeam: APITeamData = {
	id: '339942739275677726',
	icon: '5decfa5644c11081120c2f1b032d7c67',
	owner_user_id: '167383252271628288',
	members: [rawTeamMember]
};

const rawApplication: APIOauthData = {
	id: '228831628164566615',
	name: 'Klasa',
	icon: '5decfa5644c11081120c2f1b032d7c67',
	description: '',
	summary: '',
	bot_public: true,
	bot_require_code_grant: false,
	verify_key: 'You-Do-Not-Want-This',
	owner: rawOwner,
	team: rawTeam
};

/* eslint-enable camelcase */

nock(`${RestOptionsDefaults.api}/v${RestOptionsDefaults.version}`)
	.get(Routes.oauthApplication())
	.times(Infinity)
	.reply(204, rawApplication);

const client = new Client();

client.token = 'Not-A-Real-Token';

ava('fetch application', async (test): Promise<void> => {
	const application = await Application.fetch(client);

	test.is(application.client, client);
	test.is(application.id, rawApplication.id);
	test.is(application.name, rawApplication.name);
	test.is(application.icon, rawApplication.icon);
	test.is(application.description, rawApplication.description);
	test.deepEqual(application.rpcOrigins, []);
	test.is(application.botPublic, rawApplication.bot_public);
	test.is(application.botRequireCodeGrant, rawApplication.bot_require_code_grant);
	test.is(application.summary, rawApplication.summary);
	test.is(application.verifyKey, rawApplication.verify_key);
	test.is(application.guildID, null);
	test.is(application.guild, null);
	test.is(application.primarySkuID, null);
	test.is(application.slug, null);
	test.is(application.coverImage, null);

	test.not(application.team, null);
	const team = application.team as Team;
	test.is(team.client, client);
	test.is(team.id, rawTeam.id);
	test.is(team.icon, rawTeam.icon);
	test.is(team.ownerID, rawTeam.owner_user_id);
	test.is(team.members.size, 1);

	const teamMember = team.members.get(rawTeamMember.user.id) as TeamMember;
	test.truthy(teamMember);
	test.is(team.owner, teamMember);
	test.is(teamMember.client, client);
	test.is(teamMember.membershipState, rawTeamMember.membership_state);
	test.is(teamMember.id, rawTeamMemberUser.id);
	test.is(teamMember.toString(), `<@${rawTeamMemberUser.id}>`);
	test.deepEqual(teamMember.permissions, rawTeamMember.permissions);

	const teamMemberUser = teamMember.user;
	test.is(teamMemberUser.id, rawTeamMemberUser.id);
	test.is(teamMemberUser.username, rawTeamMemberUser.username);
	test.is(teamMemberUser.avatar, rawTeamMemberUser.avatar);
	test.is(teamMemberUser.discriminator, rawTeamMemberUser.discriminator);
	test.is(teamMemberUser.publicFlags, rawTeamMemberUser.public_flags);
});
