import { APIOverwriteData } from '@klasa/dapi-types';
import { Permissions } from '../../util/bitfields/Permissions';

export class PermissionOverwrites {

	public readonly id: string;
	public readonly type: 'role' | 'member';
	public readonly allow: Readonly<Permissions>;
	public readonly deny: Readonly<Permissions>;

	public constructor(data: APIOverwriteData) {
		this.id = data.id;
		this.type = data.type;
		this.allow = new Permissions(data.allow).freeze();
		this.deny = new Permissions(data.deny).freeze();
	}

}
