export default class Session {
	constructor(sessionType, durationMS, sessionId) {
		this.instantiated = Date.now();
		this.type = sessionType;
		this.duration = durationMS;
		this.pauses = [];
		this.started = false;
		this.running = false;
		this.finished = false;
		this.startTime = null;
		this.reset = false;
		this.skipped = false;
		this.lastTick = null;
		this.sessionId = sessionId;
	} 
}