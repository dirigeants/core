import Client from '../../client/Client';

export default abstract class Base {

	public readonly client: Client;
	public abstract readonly id: string;

	public constructor(client: Client) {
		this.client = client;
	}

	public clone<T = Base>(): T {
		return Object.assign(Object.create(this), this);
	}

	public abstract patch(data: object): this;

	public valueOf(): string {
		return this.id;
	}

}
