<script lang="ts">
	import { setupAdapter } from './lib/deviceInfo';
	import type { RCInputProcessor } from './lib/input/types';
	import { NavigationNode, type Direction } from './lib/navigation';
	import { onMount } from 'svelte';

	let current: NavigationNode;
	let inputAdapter: RCInputProcessor;

	inputAdapter = setupAdapter();

	const first = new NavigationNode(null, null, null, null);
	const second = new NavigationNode(null, null, first, null);
	const third = new NavigationNode(null, null, second, null);
	const fourth = new NavigationNode(first, null, null, null);
	const fifth = new NavigationNode(second, null, fourth, null);
	const sixth = new NavigationNode(third, null, fifth, null);
	const seventh = new NavigationNode(fourth, first, null, null);
	const eighth = new NavigationNode(fifth, null, seventh, null);
	const nein = new NavigationNode(sixth, null, eighth, null);
	const cener = new NavigationNode(null, null, null, null);
	cener.setLeaf('up', eighth);
	cener.setLeaf('up', nein);
	cener.setLeaf('up', seventh);

	const buttons = [first, second, third, fourth, fifth, sixth, seventh, eighth, nein, cener];

	onMount(() => {
		current = first;
		first.element.focus();
	});

	function handleKeyDown(event: KeyboardEvent) {
		const processed = inputAdapter.process(event);

		console.log(processed);

		if (!processed) {
			return;
		}

		event.preventDefault();

		if (processed.type === 'directional') {
			current = NavigationNode.navigate(processed.value as Direction, current);
		}

		if (processed.type === 'numpad' && processed.value !== 0) {
			current = buttons[processed.value - 1];
		}

		current.element.focus();
	}

	document.addEventListener('keydown', handleKeyDown);
</script>

<main id="main">
	<button bind:this="{first.element}"> One </button>
	<button bind:this="{second.element}"> Two </button>
	<button bind:this="{third.element}"> Three </button>
	<button bind:this="{fourth.element}"> Four </button>
	<button bind:this="{fifth.element}"> Five </button>
	<button bind:this="{sixth.element}"> Six </button>
	<button bind:this="{seventh.element}"> Seven </button>
	<button bind:this="{eighth.element}"> Eight </button>
	<button bind:this="{nein.element}"> Nine </button>

	<input type="text" bind:this="{cener.element}" />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
	}

	main > button {
		background-color: lightskyblue;
	}

	main > button:focus,
	main > button:focus-visible {
		outline: 4px solid red;
	}

	input {
		grid-column: 1/3;
	}
</style>
