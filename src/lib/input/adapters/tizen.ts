import type { ProcessedInput, RCInputProcessor } from '../processor';

const directionMap = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
};

export class TizenInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		switch (event.keyCode) {
			case 38 || 40 || 37 || 39: {
				return {
					type: 'directional',
					value: directionMap[event.keyCode]
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
