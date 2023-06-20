import type { ProcessedInput, RCInputProcessor } from '../processor';

const directionMap = {
	ArrowUp: 'up',
	ArrowDown: 'down',
	ArrowLeft: 'left',
	ArrowRight: 'right'
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
					value: event.key
				};
			}
		}
	}
}
