import type { ProcessedInput, RCInputProcessor } from '../types';

const keyCodeMap = {
	// Directional
	ArrowLeft: { type: 'directional', value: 'left' },
	ArrowUp: { type: 'directional', value: 'up' },
	ArrowRight: { type: 'directional', value: 'right' },
	ArrowDown: { type: 'directional', value: 'down' },

	// Numpad
	1: { type: 'numpad', value: 1 },
	2: { type: 'numpad', value: 2 },
	3: { type: 'numpad', value: 3 },
	4: { type: 'numpad', value: 4 },
	5: { type: 'numpad', value: 5 },
	6: { type: 'numpad', value: 6 },
	7: { type: 'numpad', value: 7 },
	8: { type: 'numpad', value: 8 },
	9: { type: 'numpad', value: 9 }
};

export class DummyInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		return keyCodeMap[event.key];
	}
}
