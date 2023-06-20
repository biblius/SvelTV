type NavigationGraphArg = {
	element: HTMLElement | null;
	elementName: string;
	down?: string;
	left?: string;
	right?: string;
	up?: string;
};

type NavigationGraph = {
	[x in string]: {
		element: HTMLElement;
		elementName: string;
		getElement: Function;
		down?: Function;
		left?: Function;
		right?: Function;
		up?: Function;
	};
};

// (remove this once we have a global keyCodeMap and keypressAdapter)
const keyCodeMap = {
	40: 'down',
	39: 'right',
	37: 'left',
	38: 'up'
};

// (remove this once we have a global keyCodeMap and keypressAdapter)
function eventAdapter(e) {
	return keyCodeMap[e?.keyCode];
}

/**
 * Creates a navigation graph from the array of navigation elements.
 * @param args - The list of elements which can be navigated to
 */
export function generateNavigationMap(args: NavigationGraphArg[]) {
	const navigationGraph: NavigationGraph = {};

	// Initialize items
	args.forEach((item) => {
		navigationGraph[item.elementName] = {
			element: null,
			getElement: function () {
				return this.element;
			},
			elementName: item.elementName
		};
	});

	// Assign navigation to items
	args.forEach((item) => {
		if (item.right) {
			navigationGraph[item.elementName].right = function () {
				navigationGraph[item.right].element.focus();
				return item.right;
			};
		}
		if (item.left) {
			navigationGraph[item.elementName].left = function () {
				navigationGraph[item.left].element.focus();
				return item.left;
			};
		}
		if (item.up) {
			navigationGraph[item.elementName].up = function () {
				navigationGraph[item.up].element.focus();
				return item.up;
			};
		}
		if (item.down) {
			navigationGraph[item.elementName].down = function () {
				navigationGraph[item.down].element.focus();
				return item.down;
			};
		}
	});

	return navigationGraph;
}

/**
 * This method responds to a user input event, then returns the new `activeItem`
 * @param event - Input event
 * @param navigationGraph - The navigation graph object
 * @param activeItem - Item which is currently in focus
 */
export function handleNavigation(event, navigationGraph, activeItem) {
	if (eventAdapter(event) === 'left' && !!navigationGraph[activeItem].left) {
		return navigationGraph[activeItem].left();
	}
	if (eventAdapter(event) === 'up' && !!navigationGraph[activeItem].up) {
		return navigationGraph[activeItem].up();
	}
	if (eventAdapter(event) === 'down' && !!navigationGraph[activeItem].down) {
		return navigationGraph[activeItem].down();
	}
	if (eventAdapter(event) === 'right' && navigationGraph[activeItem].right) {
		return navigationGraph[activeItem].right();
	}

	return activeItem;
}
