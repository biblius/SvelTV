import type { ProcessedInput, RCInputProcessor } from '../processor';

const keyCodeMap = {
	40: { type: 'directional', value: 'down' },
	39: { type: 'directional', value: 'right' },
	37: { type: 'directional', value: 'left' },
	38: { type: 'directional', value: 'up' }
};

export class DummyInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		return keyCodeMap[event.keyCode];
	}
}
