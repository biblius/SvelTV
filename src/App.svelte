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
		first.element.classList.add('focused');
	});

	function handleKeyDown(event: KeyboardEvent) {
		console.log('test');
		const processed = inputAdapter.process(event);

		if (!processed) {
			return;
		}

		event.preventDefault();

		current.element.classList.remove('focused');

		if (processed.type === 'directional') {
			current = NavigationNode.navigate(processed.value as Direction, current);
		}

		if (processed.type === 'numpad' && processed.value !== 0) {
			current = buttons[processed.value - 1];
		}

		current.element.focus();
		current.element.classList.add('focused');
	}

	function handleFocus(domNode) {
		current.element.classList.remove('focused');
		current = domNode;
		current.element.classList.add('focused');
		current.element.focus();
	}

	document.addEventListener('keydown', handleKeyDown);
</script>

<main id="main">
	<section class="flex flex-column">
		<div class="mb-2">
			<button
				bind:this="{first.element}"
				on:focus="{() => {
					handleFocus(first);
				}}">
				One
			</button>
			<button
				bind:this="{second.element}"
				on:focus="{() => {
					handleFocus(second);
				}}">
				Two
			</button>
			<button
				bind:this="{third.element}"
				on:focus="{() => {
					handleFocus(third);
				}}">
				Three
			</button>
		</div>
		<div class="mb-2">
			<button
				bind:this="{fourth.element}"
				on:focus="{() => {
					handleFocus(fourth);
				}}">
				Four
			</button>
			<button
				bind:this="{fifth.element}"
				on:focus="{() => {
					handleFocus(fifth);
				}}">
				Five
			</button>
			<button
				bind:this="{sixth.element}"
				on:focus="{() => {
					handleFocus(sixth);
				}}">
				Six
			</button>
		</div>
		<div class="mb-2">
			<button
				bind:this="{seventh.element}"
				on:focus="{() => {
					handleFocus(seventh);
				}}">
				Seven
			</button>
			<button
				bind:this="{eighth.element}"
				on:focus="{() => {
					handleFocus(eighth);
				}}">
				Eight
			</button>
			<button
				bind:this="{nein.element}"
				on:focus="{() => {
					handleFocus(nein);
				}}">
				Nine
			</button>
		</div>

		<input
			type="text"
			bind:this="{cener.element}"
			on:focus="{() => {
				handleFocus(cener);
			}}" />
	</section>
</main>

<style>
	input {
		width: 100%;
		outline: none;
	}

	button {
		background-color: lightslategrey;
		border-radius: 8px;
		border: 2px solid transparent;
		color: white;
		font-size: 1em;
		font-weight: 500;
		outline: none;
		padding: 0.6em 1.2em;
		transition-duration: 0.25s;
		transition-property: border-color, background-color;
		width: 80px;
	}

	button:hover {
		border: 2px solid rgb(255, 150, 111);
		background-color: rgb(141, 151, 161);
	}

	:global(button.focused) {
		border: 2px solid coral;
	}
	:global(input.focused) {
		border: 2px solid coral;
	}
</style>
