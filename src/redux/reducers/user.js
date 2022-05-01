export default (state = {}, action) => {
	switch (action.type) {
		case "getuser":
			return state;
		case "setuser":
			return action.payload;
		default:
			return state;
	}
};
