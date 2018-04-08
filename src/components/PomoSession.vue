<template>
		<div class="session-name">
			<transition name="fade-session">
				<span :key="currentSessionName" :class="currentSessionName">
					{{currentSessionName}}
				</span>
			</transition>
		</div>
</template>

<script>
export default {
	computed: {
		currentSessionName() {
			return this.$store.getters.currentSessionName;
		}
	}
}
</script>

<style scoped>
.session-name {
	font-size: 1.3rem;
	border: 2px 0 2px 0 solid;
	text-transform: capitalize;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.session-name span {
	margin: auto;
	position: absolute;
	width: 7rem;
	border-radius: 0.6em;
	font-weight: 600;
	opacity: 0.8;
}

.session-name span.focus {
	border: 2px solid var(--focus);
	color: var(--focus);
}

.session-name span.short {
	border: 2px solid var(--short);
	color: var(--short);
}

.session-name span.long {
	border: 2px solid var(--long);
	color: var(--long);
}

.fade-session-enter-active, .fade-session-leave-active {
	transition: all .8s ease;
}

.fade-session-enter, .fade-session-leave-to {
	opacity: 0;
	
}

.fade-session-enter {
	transform: translateX(3em);
}

.fade-session-leave-to {
	transform: translateX(-3em);
}
</style>
