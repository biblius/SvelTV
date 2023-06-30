<script lang="ts">
	export let node;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleFocus() {
		dispatch('focus');
	}
</script>

<button bind:this="{node}" on:focus="{handleFocus}">
	<slot />
</button>

<style>
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
