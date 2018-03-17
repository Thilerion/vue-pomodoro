<template>
<transition name="fade">
		<div class="stats-overlay" v-if="statsOpen">
			<div class="top-bar">
				<div class="center">
					<h2>Statistics</h2>
				</div>
				<div class="right">
					<button class="close-button" @click="toggleStats">
					<svg class="close-icon" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
						<path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				</button>
				</div>
				
			</div>
			<div class="main">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo magnam quam, rerum provident commodi sit molestias mollitia totam dolorem non.</p>
				<p>Vitae voluptatem illum nam pariatur magni sed necessitatibus tenetur sint vel unde! Aut obcaecati molestiae cumque, possimus reiciendis debitis necessitatibus.</p>
				<p>Quaerat excepturi possimus, nam esse, numquam pariatur aut, error quo veritatis ullam ex. Animi quam nulla quo nisi optio provident!</p>
				<p>Quia sunt magnam esse odit quis vel commodi! Distinctio, molestias corporis facilis laboriosam provident eaque fugiat accusamus dolores adipisci hic!</p>
				<p>Ratione blanditiis deserunt error eaque tempora, nam suscipit eos molestias beatae in perferendis cupiditate libero, ipsa mollitia. Facere, iure voluptatem!</p>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	computed: {
		statsOpen() {
			return this.$store.getters.statsOpen;
		}
	},
	methods: {
		toggleStats() {
			this.$store.commit('toggleStatsOpen');
		}
	}
}
</script>

<style scoped>
.stats-overlay {
	position: fixed;
	z-index: 100;
	height: 100%;
	width: 100%;
	background: rgb(32, 32, 32);
	background: #eeeeee;
	transform-origin: 2rem 2.8rem;
	display: flex;
	flex-direction: column;
}

h2 {
	font-size: 1.25rem;
	font-weight: bold;
	letter-spacing: 0.03em;
}

.top-bar {
	height: 4rem;
	display: grid;
	grid-template-columns: 4rem auto 4rem;
	grid-auto-rows: 100%;
	align-items: center;
	position: relative;
	flex: 0 0 auto;
}

.center {
	grid-column: 2;
}

svg.close-icon {
	width: 33px;
	height: 33px;
}

.right {
	grid-column: 3;
}

.close-button {
	transition: opacity .3s ease;
	width: 38px;
	height: 38px;
	padding-top: 7px;
}

.close-button:hover, .close-button:focus {
	opacity: 1;
}

.fade-enter-active, .fade-leave-active {
	transition:  transform .3s ease, opacity .4s ease;
}

.fade-enter, .fade-leave-to {
	transform: scale(0.3);	
	opacity: 0;	
}

.main {
	flex: 1;
	padding: 0 1rem;
	margin-bottom: 1rem;
	text-align: left;
	overflow-y: scroll;
	align-self: center;
	width: 70%;
}
</style>
