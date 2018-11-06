import Client from '../../client/Client';

export default abstract class Base {

	public abstract readonly id: string;

	public constructor(public client: Client) { }

	public clone<T = Base>(): T {
		return Object.assign(Object.create(this), this);
	}

	public abstract patch(data: object): this;

	public valueOf(): string {
		return this.id;
	}

}
