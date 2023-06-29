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
	const seventh = new NavigationNode(fourth, null, null, null);
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
		console.log(event);

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
	<h1>Demo navigation App in SvelteTV</h1>
	<div class="col">
		<button bind:this="{first.element}"> One </button>
		<button bind:this="{second.element}"> Two </button>
		<button bind:this="{third.element}"> Three </button>
	</div>
	<div class="col">
		<button bind:this="{fourth.element}"> Four </button>
		<button bind:this="{fifth.element}"> Five </button>
		<button bind:this="{sixth.element}"> Six </button>
	</div>
	<div class="col">
		<button bind:this="{seventh.element}"> Seven </button>
		<button bind:this="{eighth.element}"> Eight </button>
		<button bind:this="{nein.element}"> Nine </button>
	</div>

	<div class="col center">
		<input type="text" bind:this="{cener.element}" />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}

	.col {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.center {
		justify-content: center;
	}

	input {
		width: 100%;
	}

	button {
		outline: none;
		width: 33%;
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: rgba(26, 26, 26, 1);
		cursor: pointer;
		transition: border-color 0.25s;
	}
	button:hover {
		border-color: rgba(100, 108, 255, 1);
	}
	button:focus,
	button:focus-visible {
		border-color: rgba(100, 108, 255, 1);
	}
</style>
