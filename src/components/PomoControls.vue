<template>
	<div class="button-container">
		<button id="reset-timer" class="state-button small"><i class="material-icons">replay</i></button>
		<button id="start-timer" class="state-button large"><i class="material-icons" @click="mainButtonActions">play_arrow</i></button>
		<button id="skip-timer" class="state-button small"><i class="material-icons">skip_next</i></button>
	</div>
</template>

<script>
export default {
	methods: {
		start() {
			
		},
		pause() {
			
		},
		mainButtonActions() {
			
		}
	}
}
</script>

<style scoped>
	.button-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.state-button {
		border-radius: 50%;
		border: none;
		background: transparent;
		margin: 0 0.8rem;
	}

	.state-button.large {
		border: 3px solid;
		background-color: rgba(255,255,255,0.2);
	}

	.state-button.small {
		opacity: 0.7;
	}
	
	.state-button i {
		margin: calc(.7rem + 5px) .7rem;
	}

	.state-button.large i {
		font-size: 48px;
	}
</style>
