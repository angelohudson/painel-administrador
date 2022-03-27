class UserService {

	saveAccessToken(data) {
		let loginDate = new Date();
		let expirationIn = new Date(new Date().getTime() + data['expirationIn']).getTime();
		localStorage.setItem('expirationIn', expirationIn);
		localStorage.setItem('credentials', "Bearer " + data['accessToken']);
	}

	getAccessToken() {
		return localStorage.getItem('credentials');
	}

	getExpirationIn() {
		return localStorage.getItem('expirationIn');
	}

	hasAccessToken() {
		let expirationIn = this.getExpirationIn();
		if (expirationIn > new Date().getTime())
			return this.getAccessToken();
		return false;
	}

	logout() {
		localStorage.removeItem('credentials');
		localStorage.removeItem('authorities');
	}
}

export default new UserService();