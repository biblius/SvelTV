import { DummyInputAdapter } from './input/adapters/dummy';
import { TizenInputAdapter } from './input/adapters/tizen';
import { WebosInputAdapter } from './input/adapters/webos';
import type { RCInputProcessor } from './input/processor';

export function setupAdapter(): RCInputProcessor {
	const tizen = /tizen/i;
	const webos = /web0s/i; // wtf

	const device = navigator.userAgent;

	if (tizen.test(device)) {
		console.log('WE ON TIZEN BOI');
		return new TizenInputAdapter();
	}

	if (webos.test(device)) {
		console.log('WE ON WEBOS BOI');
		return new WebosInputAdapter();
	}

	console.log('WE ON BROWSER BOI');
	return new DummyInputAdapter();
}
