export type Direction = 'up' | 'down' | 'left' | 'right';

export class NavigationNode {
	// Must be undefined when constructing since we're binding elements to it
	// after. Theoretically should never be undefined once the underlying component is constructed
	element?: HTMLElement;
	down?: NavigationNode;
	left?: NavigationNode;
	right?: NavigationNode;
	up?: NavigationNode;

	/**
	 * This will alter any appropriate branches of the nodes passed into the constructor.
	 * Since a node can only branch to 4 directions, the node provided for any direction has the opposite
	 * direction assigned to `this`, i.e. the current node being constructed
	 * @param up
	 * @param down
	 * @param left
	 * @param right
	 */
	constructor(
		up: NavigationNode | null,
		down: NavigationNode | null,
		left: NavigationNode | null,
		right: NavigationNode | null
	) {
		if (up) {
			up.down = this;
			this.up = up;
		}
		if (down) {
			down.up = this;
			this.down = down;
		}

		if (left) {
			left.right = this;
			this.left = left;
		}

		if (right) {
			right.left = this;
			this.right = right;
		}
	}

	setLeaf(direction: Direction, node: NavigationNode): void {
		this[direction] = node;
		node[opposite(direction)] = this;
	}

	removeLeaf(direction: Direction): void {
		const old = this[direction];
		this[direction] = null;
		old[opposite(direction)] = null;
	}

	/**
	 * This method responds to a user input event, then returns the new `activeItem`
	 * @param event - Input event
	 * @param navigationGraph - The navigation graph object
	 * @param activeItem - Item which is currently in focus
	 */
	static navigate(direction: Direction, current: NavigationNode) {
		if (direction === 'left' && !!current.left) {
			return current.left;
		}
		if (direction === 'up' && !!current.up) {
			return current.up;
		}
		if (direction === 'down' && !!current.down) {
			return current.down;
		}
		if (direction === 'right' && !!current.right) {
			return current.right;
		}
		return current;
	}
}

const oppositeDirections = {
	up: 'down',
	down: 'up',
	left: 'right',
	right: 'left'
};

function opposite(direction: Direction) {
	return oppositeDirections[direction];
}
