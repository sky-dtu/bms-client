export default (state = "view-booklist", action) => {
	switch (action.type) {
		case "view-booklist":
			return action.type;
		case "add-book":
			return action.type;
		case "deposit-book":
			return action.type;
		default:
			return state;
	}
};
