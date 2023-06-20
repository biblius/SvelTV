import type { ProcessedInput, RCInputProcessor } from '../processor';

export class TizenInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		switch (event.keyCode) {
			// Up
			case 38: {
				return {
					type: 'directional',
					value: 'up'
				};
			}
			// Down
			case 40: {
				return {
					type: 'directional',
					value: 'down'
				};
			}

			// Left
			case 37: {
				return {
					type: 'directional',
					value: 'left'
				};
			}

			// Right
			case 39: {
				return {
					type: 'directional',
					value: 'right'
				};
			}

			// Enter
			case 13: {
				return {
					type: 'directional',
					value: 'enter'
				};
			}
		}
	}
}
