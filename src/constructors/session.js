export default class Session {
	constructor(sessionType, durationMS) {
		this.sessionType = sessionType;
		this.duration = durationMS;
		this.pauses = [];
		this.state = {
			started: false,
			running: false,
			finished: false
		};
		this.lastTick = null;
		this.startTime = null;
	} 
}