<template>
	<div class="cycle-div">
		<ul class="cycle-list" ref="cycleList" :style="translate">
			<li class="session-span" v-for="(session, index) in cycleArray" :key="index" :class="sessionClass(index)" :ref="'session' + index">
				<span>{{session}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			moveAmount: 0
		}
	},
	computed: {
		cycleArray() {
			return this.$store.getters.cycleArrayDisplay;
		},
		currentSessionId() {
			return this.$store.getters.currentSessionId;
		},
		translate() {
			return {
				transform: `translateX(${this.moveAmount}px)`
			}
		}
	},
	methods: {
		sessionClass(n) {
			if (this.currentSessionId === n) return "current";
			else if (this.currentSessionId > n) return "finished";
			else return "future";
		},
		setOffset(n) {
			let el = this.$refs["session" + n][0];
			let parent = this.$refs.cycleList;
			console.log(el, parent);
			/*let targetPosition = (parent.offsetWidth / 2) - (el.offsetWidth / 2);
			console.log(targetPosition);
			let moveAmount = targetPosition - el.offsetLeft;
			console.log(moveAmount);
			this.moveAmount = moveAmount;*/
			let itemLeft = el.offsetLeft;
			console.log(itemLeft);
			if (itemLeft < 60) this.moveAmount = 60 - itemLeft;
			else if (itemLeft > parent.offsetWidth - 50) {
				console.log(itemLeft, (parent.offsetWidth - el.offsetWidth - 50));
				this.moveAmount = parent.offsetWidth - el.offsetWidth - 50 - itemLeft;
			}
			
		}
	},
	mounted() {
		this.setOffset(this.currentSessionId);
	}
}
</script>

<style scoped>
.cycle-div {
	position: relative;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
}

.cycle-div:after {
	position: absolute;
	content: '';
	left: 0; right: 0;
	top: 0; bottom: 0;
	box-shadow: inset -45px 0 45px -5px #eee, inset 45px 0 45px -5px #eee;	
}

li > span {
	 text-shadow: 1px 1px 0 #eee, -1px 1px 0 #eee, -1px -1px 0 #eee, 1px -1px 0 #eee;
}

.session-span {
	display: inline-block;
	text-align: center;
	padding: 1rem 0;
	margin: 0 1.5rem;
	flex: 1 0 auto;
	position: relative;
}

.session-span:not(:last-of-type):after {
	content: "";
	display: block;
	position: absolute;
	right: -2.5rem;
	top: calc(50% + 1px);
	height: 1px;
	width: 2rem;
	margin: auto;
	background: black;
	opacity: 0.3;
}

.cycle-list {
	display: flex;
	justify-content: center;
}

.current {
	font-weight: bold;
}

.finished {
	opacity: 0.3;
	text-decoration: line-through;
}

.future {
	opacity: 0.7;
}
</style>
