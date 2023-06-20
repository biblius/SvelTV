<script>
	import { generateNavigationMap, handleNavigation } from './lib/utils/navigationHandler';
	import { onMount } from 'svelte';

	function handleKeyDown(event) {
		activeItem = handleNavigation(event, navigationGraph, activeItem);
	}
	document.addEventListener('keydown', handleKeyDown);

	/**
	 * Defines the elements which can be navigated to, as well as their immediate siblings which can be navigated to
	 */
	let navigationElements = [
		{
			elementName: 'button1',
			right: 'button2',
			down: 'button4'
		},
		{
			elementName: 'button2',
			left: 'button1',
			right: 'button3',
			down: 'button5'
		},
		{
			elementName: 'button3',
			left: 'button2',
			down: 'button6'
		},
		{
			elementName: 'button4',
			right: 'button5',
			down: 'button7',
			up: 'button1'
		},
		{
			elementName: 'button5',
			left: 'button4',
			right: 'button6',
			down: 'button8',
			up: 'button2'
		},
		{
			elementName: 'button6',
			left: 'button5',
			down: 'button9',
			up: 'button3'
		},
		{
			elementName: 'button7',
			right: 'button8',
			up: 'button4'
		},
		{
			elementName: 'button8',
			left: 'button7',
			right: 'button9',
			up: 'button5'
		},
		{
			elementName: 'button9',
			left: 'button8',
			up: 'button6'
		}
	];

	let navigationGraph = generateNavigationMap(navigationElements);

	let activeItem = 'button1';

	onMount(() => {
		navigationGraph.button1.element.focus();
	});
</script>

<main id="main">
	<button bind:this="{navigationGraph.button1.element}"> One </button>
	<button bind:this="{navigationGraph.button2.element}"> Two </button>
	<button bind:this="{navigationGraph.button3.element}"> Three </button>
	<button bind:this="{navigationGraph.button4.element}"> Four </button>
	<button bind:this="{navigationGraph.button5.element}"> Five </button>
	<button bind:this="{navigationGraph.button6.element}"> Six </button>
	<button bind:this="{navigationGraph.button7.element}"> Seven </button>
	<button bind:this="{navigationGraph.button8.element}"> Eight </button>
	<button bind:this="{navigationGraph.button9.element}"> Nine </button>
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
