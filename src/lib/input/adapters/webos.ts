import type { Direction } from '../../navigation';
import type { ProcessedInput, RCInputProcessor } from '../types';

const directionMap = {
	ArrowUp: 'up' as Direction,
	ArrowDown: 'down' as Direction,
	ArrowLeft: 'left' as Direction,
	ArrowRight: 'right' as Direction
};

export class WebosInputAdapter implements RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput {
		switch (event.key) {
			case 'ArrowUp' || 'ArrowDown' || 'ArrowLeft' || 'ArrowRight': {
				return {
					type: 'directional',
					value: directionMap[event.key]
				};
			}
			case 'Enter': {
				return {
					type: 'action',
					value: 'enter'
				};
			}
			case '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9' || '0': {
				return {
					type: 'numpad',
					value: parseInt(event.key)
				};
			}
		}
	}
}
