<script lang="ts">
	import { onMount } from 'svelte';

	console.log(navigator);

	let first = null;

	onMount(async () => {
		first.focus();
		imgSrc = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				return res.sprites.front_default;
			});
	});

	let imgSrc = '';
</script>

<main id="main">
	<button tabindex="0" bind:this="{first}"> One </button>
	<button tabindex="0"> Two </button>
	<button tabindex="0"> Three </button>
	<button tabindex="0"> Four </button>
	<button tabindex="0"> Five </button>
	<button tabindex="0"> Six </button>
	<button tabindex="0"> Seven </button>
	<button tabindex="0"> Eight </button>
	<button tabindex="0"> Nine </button>

	<input type="text" />
	<img src="{imgSrc}" alt="" />
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
