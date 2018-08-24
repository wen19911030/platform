function resDataFormat(code = 0, message = "success", data = {}) {
	let obj = {
		code,
		message,
		data
	};
	return JSON.stringify(obj);
}

module.exports = {
	resDataFormat
};
