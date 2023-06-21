import type { Direction } from '../../navigation';
import type { ProcessedInput, RCInputProcessor } from '../types';

const directionMap = {
	37: 'left' as Direction,
	38: 'up' as Direction,
	39: 'right' as Direction,
	40: 'down' as Direction
};

export class TizenInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		switch (event.keyCode) {
			case 38:
			case 40:
			case 37:
			case 39: {
				return {
					type: 'directional',
					value: directionMap[event.keyCode]
				};
			}
			// Enter
			case 13: {
				return {
					type: 'action',
					value: 'enter'
				};
			}
		}
	}
}
