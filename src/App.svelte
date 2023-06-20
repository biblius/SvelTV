<script lang="ts">
	import { DummyInputAdapter } from './lib/input/adapters/dummy';
	import type { RCInputProcessor } from './lib/input/processor';
	import { NavigationNode, type Direction } from './lib/navigation';
	import { onMount } from 'svelte';

	let current: NavigationNode;
	let inputAdapter: RCInputProcessor;

	const first = new NavigationNode(null, null, null, null);
	const second = new NavigationNode(null, null, first, null);
	const third = new NavigationNode(null, null, second, null);
	const fourth = new NavigationNode(first, null, null, null);
	const fifth = new NavigationNode(second, null, fourth, null);
	const sixth = new NavigationNode(third, null, fifth, null);
	const seventh = new NavigationNode(fourth, null, null, null);
	const eighth = new NavigationNode(fifth, null, seventh, null);
	const nein = new NavigationNode(sixth, null, eighth, null);

	onMount(() => {
		current = first;
		first.element.focus();
	});

	inputAdapter = new DummyInputAdapter();

	function handleKeyDown(event: KeyboardEvent) {
		const processed = inputAdapter.process(event);

		if (!processed) {
			return;
		}

		if (processed.type === 'directional') {
			current = NavigationNode.navigate(processed.value as Direction, current);
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
</style>
