import * as Package from '../../package.json';

export const UserAgent = `DiscordBot (${Package.homepage.split('#')[0]}, ${Package.version}) Node.js/${process.version}`;
