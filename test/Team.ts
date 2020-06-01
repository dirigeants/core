import ava from 'ava';
import nock = require('nock');
import { RestOptionsDefaults, Routes } from '@klasa/rest';
import { Client, Application } from '../src';

import { APIUserData, APIOauthData } from '@klasa/dapi-types';

const rawOwner: APIUserData = {

};

const rawMember: APIUserData = {

};

const rawApplication: APIOauthData = {

};

nock(`${RestOptionsDefaults.api}/v${RestOptionsDefaults.version}`)
	.get(Routes.oauthApplication())
	.times(Infinity)
	.reply(204, rawApplication);

const client = new Client();

client.token = 'Not-A-Real-Token';

ava('fetch application with team', async (test): Promise<void> => {
	const application = await Application.fetch(client);
});
