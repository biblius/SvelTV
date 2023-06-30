<script lang="ts">
	import Button from './components/Button.svelte';
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
			<Button
				bind:node="{first.element}"
				on:focus="{() => {
					handleFocus(first);
				}}">
				One
			</Button>
			<Button
				bind:node="{second.element}"
				on:focus="{() => {
					handleFocus(second);
				}}">
				Two
			</Button>
			<Button
				bind:node="{third.element}"
				on:focus="{() => {
					handleFocus(third);
				}}">
				Three
			</Button>
		</div>
		<div class="mb-2">
			<Button
				bind:node="{fourth.element}"
				on:focus="{() => {
					handleFocus(fourth);
				}}">
				Four
			</Button>
			<Button
				bind:node="{fifth.element}"
				on:focus="{() => {
					handleFocus(fifth);
				}}">
				Five
			</Button>
			<Button
				bind:node="{sixth.element}"
				on:focus="{() => {
					handleFocus(sixth);
				}}">
				Six
			</Button>
		</div>
		<div class="mb-2">
			<Button
				bind:node="{seventh.element}"
				on:focus="{() => {
					handleFocus(seventh);
				}}">
				Seven
			</Button>
			<Button
				bind:node="{eighth.element}"
				on:focus="{() => {
					handleFocus(eighth);
				}}">
				Eight
			</Button>
			<Button
				bind:node="{nein.element}"
				on:focus="{() => {
					handleFocus(nein);
				}}">
				Nine
			</Button>
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
</style>
