import ava from 'ava';
import { TimerManager } from '@klasa/timer-manager';
import { BaseClient } from '../src';

const client = new BaseClient();

TimerManager.setInterval(() => {
	// foo
}, 6000);

TimerManager.setTimeout(() => {
	// Bar
}, 600000);

ava('destroy', async (test): Promise<void> => {
	test.plan(4);

	// eslint-disable-next-line dot-notation
	test.is(TimerManager['_timeouts'].size, 1);
	// Second one is the RestManager sweep interval
	// eslint-disable-next-line dot-notation
	test.is(TimerManager['_intervals'].size, 2);
	await client.destroy();
	// eslint-disable-next-line dot-notation
	test.is(TimerManager['_timeouts'].size, 0);
	// eslint-disable-next-line dot-notation
	test.is(TimerManager['_intervals'].size, 0);
});
