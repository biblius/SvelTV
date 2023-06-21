import { StandardInputAdapter } from './input/adapters/standard';
import { TizenInputAdapter } from './input/adapters/tizen';
import type { RCInputProcessor } from './input/types';

export function setupAdapter(): RCInputProcessor {
	const tizen = /tizen/i;

	const device = navigator.userAgent;

	if (tizen.test(device)) {
		console.log('Using grandpa (tizen) input adapter');
		return new TizenInputAdapter();
	}

	console.log('Using standard input adapter');
	return new StandardInputAdapter();
}
