import type { Direction } from '../navigation';

export type ProcessedInput = NumpadInput | NavigationInput | ActionInput;

export type NumpadInput = {
	type: 'numpad';
	value: number;
};

export type NavigationInput = {
	type: 'directional';
	value: Direction;
};

export type ActionInput = {
	type: 'action';
	value: string;
};

export interface RCInputProcessor {
	process(event: KeyboardEvent): ProcessedInput;
}
