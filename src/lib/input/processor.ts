import type { Direction } from '../navigation';

export type ProcessedInput = {
	type: InputType;
	value: string;
};

type InputType = 'directional' | 'numpad' | 'action';

export interface RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput;
}
