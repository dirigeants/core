import { deepClone } from '@klasa/utils';
import { APIEmbedData, APIEmbedFieldData, APIEmbedProviderData, EmbedType } from '../../../util/types/DiscordAPI';

export class MessageEmbed implements EmbedData {

	public fields!: APIEmbedFieldData[];
	public type?: EmbedType;
	public title?: string;
	public description?: string;
	public url?: string;
	public color?: number;
	public timestamp!: number | null;
	public thumbnail!: ImageData | null;
	public image!: ImageData | null;
	public video!: ImageData | null;
	public author!: AuthorIconData | null;
	public provider?: APIEmbedProviderData;
	public footer!: IconData | null;

	public constructor(data: APIEmbedData = {}) {
		this.setup(data);
	}

	public setup(data: APIEmbedData) {
		this.type = data.type;

		this.title = data.title;

		this.description = data.description;

		this.url = data.url;

		this.color = Number(data.color);

		this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;

		this.fields = data.fields ? data.fields.map(deepClone) : [];

		this.thumbnail = data.thumbnail ? {
			url: data.thumbnail.url,
			proxyURL: data.thumbnail.proxy_url,
			height: data.thumbnail.height,
			width: data.thumbnail.width
		} : null;

		this.image = data.image ? {
			url: data.image.url,
			proxyURL: data.image.proxy_url,
			height: data.image.height,
			width: data.image.width
		} : null;

		this.video = data.video ? {
			url: data.video.url,
			height: data.video.height,
			width: data.video.width
		} : null;

		this.author = data.author ? {
			name: data.author.name,
			url: data.author.url,
			iconURL: data.author.icon_url,
			proxyIconURL: data.author.proxy_icon_url
		} : null;

		this.provider = data.provider;

		this.footer = data.footer ? {
			text: data.footer.text,
			iconURL: data.footer.icon_url,
			proxyIconURL: data.footer.proxy_icon_url
		} : null;
	}

	public get createdAt(): Date | null {
		return this.timestamp ? new Date(this.timestamp) : null;
	}

	public get hexColor(): string | null {
		return this.color ? `#${this.color.toString(16).padStart(6, '0')}` : null;
	}

	public addFields(...fields: EmbedFields): this {
		this.fields.push(...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	public addBlankField(inline?: boolean): this {
		return this.addFields({ name: '\u200B', value: '\u200B', inline });
	}

	public spliceFields(index: number, deleteCount: number, ...fields: EmbedFields): this {
		this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	public setAuthor(name: string, iconURL?: string, url?: string): this {
		this.author = { ...this.author, name: String(name), iconURL, url };
		return this;
	}

	public setColor(color: number): this {
		this.color = Number(color);
		return this;
	}

	public setFooter(text: string, iconURL?: string): this {
		this.footer = { ...this.footer, text: String(text), iconURL };
		return this;
	}

	public setImage(url: string): this {
		this.image = { ...this.image, url };
		return this;
	}

	public setThumbnail(url: string): this {
		this.thumbnail = { ...this.thumbnail, url };
		return this;
	}

	public setTimestamp(timestamp: number | Date = Date.now()): this {
		this.timestamp = timestamp instanceof Date ? timestamp.getTime() : timestamp;
		return this;
	}

	public setTitle(title: string): this {
		this.title = String(title);
		return this;
	}

	public setURL(url: string): this {
		this.url = url;
		return this;
	}

	public toJSON(): MessageEmbedJSON {
		return {
			title: this.title,
			type: 'rich',
			description: this.description,
			url: this.url,
			timestamp: this.timestamp ? new Date(this.timestamp) : null,
			color: this.color,
			fields: this.fields,
			thumbnail: this.thumbnail,
			image: this.image,
			author: this.author ? {
				name: this.author.name,
				url: this.author.url,
				icon_url: this.author.iconURL
			} : undefined,
			footer: this.footer ? {
				text: this.footer.text!,
				icon_url: this.footer.iconURL
			} : undefined
		};
	}

	private static normalizeField(name: string, value: string, inline = false): Required<APIEmbedFieldData> {
		if (typeof name !== 'string') name = String(name);
		if (typeof value !== 'string') value = String(value);
		return { name, value, inline };
	}

	private static normalizeFields(...fields: EmbedFields): Required<APIEmbedFieldData>[] {
		return fields.flat(2).map(({ name, value, inline }: APIEmbedFieldData): Required<APIEmbedFieldData> => this.normalizeField(name, value, inline));
	}

}

interface ImageData {
	url?: string;
	proxyURL?: string;
	height?: number;
	width?: number;
}

interface IconData {
	proxyIconURL?: string;
	text?: string;
	iconURL?: string;
}

interface AuthorIconData extends Omit<IconData, 'text'> {
	name?: string;
	url?: string;
}

type EmbedData = Omit<APIEmbedData, 'timestamp' | 'thumbnail' | 'image' | 'video' | 'author' | 'footer'>;

type EmbedFields = (APIEmbedFieldData | APIEmbedFieldData[])[];

interface MessageEmbedJSON extends Omit<APIEmbedData, 'type' | 'timestamp' | 'thumbnail' | 'image'> {
	type: 'rich';
	timestamp: Date | null;
	thumbnail: ImageData | null;
	image: ImageData | null;
}
