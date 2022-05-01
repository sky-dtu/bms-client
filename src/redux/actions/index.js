export const login = {
	type: "login"
};

export const logout = {
	type: "logout"
};

export const getuser = (payload) => {
	return {
		type: "getuser",
		payload
	}
};

export const setuser = (payload) => {
	return {
		type: "setuser",
		payload
	}
};

export const getbooklist = (payload) => {
	return {
		type: "getbooklist",
		payload
	}
};

export const setbooklist = (payload) => {
	return {
		type: "setbooklist",
		payload
	}
};



export const changesection = (payload) => {
	return {
		type: payload
	}
};