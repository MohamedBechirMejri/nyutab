const convertDateandTime = (date: string, time: string) => {
	return new Date(`${date}:${time}`);
};

export default convertDateandTime;
