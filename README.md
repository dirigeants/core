# @klasa/core
This is an early alpha discord library which will be the future core of the Klasa Bot framework. This implements a high-level stateful interface over @klasa/rest and @klasa/ws. You are bound to come across missing or broken code/types using this alpha library. (I even found some unintended types while writing this!s) Please make issues and pull requests to further the development.

Simple ping client in typescript
```typescript
import { Client, ClientEvents } from '@klasa/core';
import config from './config.json';

const client = new Client()
	.on(ClientEvents.MessageCreate, async (message): Promise<void> => {
		if (message.content.toLowerCase().startsWith('ping')) {
			const [response] = await message.channel.send(mb => mb.setContent('ping?'));
			await response.edit(mb => mb.setContent(`Pong! Took: ${response.createdTimestamp - message.createdTimestamp}ms`));
		}
	});

client.token = config.token;

client.connect();
```

Simple ping client in javascript
```javascript
const { Client } = require('@klasa/core');
const { token } = require('./config.json');

const client = new Client()
    .on('messageCreate', async (message) => {
        if (message.content.toLowerCase().startsWith('ping')) {
            const [response] = await message.channel.send(mb => mb.setContent('ping?'));
            return response.edit(mb => mb.setContent(`Pong! Took: ${response.createdTimestamp - message.createdTimestamp}ms`));
        }
    });

client.token = token;

client.connect();
```