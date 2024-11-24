export const getSysTime = () => {
	let newDate = new Date();
	return `${newDate.getHours()}:${newDate.getMinutes()}`;
};
