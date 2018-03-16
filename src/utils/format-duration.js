import moment from 'moment';
moment.locale('nl');

const formatDuration = (duration, formatting) => {
	if (formatting == null) {
		formatting = "mm:ss";
	}
	
	return moment.utc(moment.duration(Math.floor(duration / 1000) * 1000).asMilliseconds()).format(formatting);
}

export default formatDuration;