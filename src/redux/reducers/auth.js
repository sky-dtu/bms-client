export default (state = 0, action) => {
	switch (action.type) {
		case "login":
			return 1;
		case "logout":
			localStorage.removeItem('Authorization')
			localStorage.removeItem('user')
			return 0;
		default:
			return state;
	}
};
