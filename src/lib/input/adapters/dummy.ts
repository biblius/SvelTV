import type { ProcessedInput, RCInputProcessor } from '../processor';

const keyCodeMap = {
	37: { type: 'directional', value: 'left' },
	38: { type: 'directional', value: 'up' },
	39: { type: 'directional', value: 'right' },
	40: { type: 'directional', value: 'down' }
};

export class DummyInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		return keyCodeMap[event.keyCode];
	}
}
