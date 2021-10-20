class UserService {

	saveLoggedUser(user) {
		const encodedUser = this._encodeUser(user);
		localStorage.setItem('credentials', encodedUser);
	}

	getLoggedUser() {
		const encodedUser = localStorage.getItem('credentials');
		return this._decodeUser(encodedUser);
	}

	hasLoggedUser() {
		const loggedUser = this.getLoggedUser();
		return loggedUser.username;
	}

	logout() {
		localStorage.removeItem('credentials');
		localStorage.removeItem('authorities');
	}

	_encodeUser(user) {
		return window.btoa(`${user.username}~${user.password}`);
	}

	_decodeUser(encodedUser) {
		const userString = window.atob(encodedUser);
		const parts = userString.split('~');
		if (parts.length === 2)
			return { username: parts[0], password: parts[1] };

		return {};
	}

	saveAuthorities(authorities) {
		localStorage.setItem('authorities', authorities);
	}

	getAuthorities() {
		return localStorage.getItem('authorities');
	}
}

export default new UserService();