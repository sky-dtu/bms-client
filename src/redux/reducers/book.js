export default (state = [], action) => {
	switch (action.type) {
		case "getbooklist":
			return state;
		case "setbooklist":
			return action.payload;
		default:
			return state;
	}
};
