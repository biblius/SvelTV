<script lang="ts">
	import Button from './lib/components/Button.svelte';
	import { setupAdapter } from './lib/deviceInfo';
	import type { RCInputProcessor } from './lib/input/types';
	import { NavigationNode, changeFocus, handleNavigate } from './lib/navigation';
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

	onMount(() => {
		current = first;
		first.element.focus();
		first.element.classList.add('focused');
	});

	function handleKeyDown(event: KeyboardEvent) {
		current = handleNavigate(current, event, inputAdapter);
	}

	function handleFocus(domNode: NavigationNode) {
		current = changeFocus(current, domNode);
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
