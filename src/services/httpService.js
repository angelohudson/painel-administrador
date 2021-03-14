import axios from 'axios';
import Paths from 'constants/paths.js';

class HttpService {

	login(user) {
		const url = this._getUrl('auth/basic');
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	saveMember(user, member) {
		const url = this._getUrl('membro');
		return axios(url, {
			method: 'POST',
			auth: user,
			data: member
		});
	}

	findCep(cep) {
		const url = `http://viacep.com.br/ws/${cep}/json/`
		return axios(url, {
			method: 'GET',
		});
	}

	getMinistries(user) {
		const url = this._getUrl('ministerio');
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getGroups(user, ministrieId) {
		const url = this._getUrl(`grupo/${ministrieId}`);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getMembers(user, ministrieId) {
		const url = this._getUrl(`membro/by-ministerio/${ministrieId}`);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getAllMembers(user) {
		const url = this._getUrl(`membro`);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	associateMembers(user, members, ministrieId) {
		const url = this._getUrl(`ministerio/associa-membro`);
		const form = { "membros": members, "ministerioId": ministrieId };
		return axios(url, {
			method: 'POST',
			auth: user,
			data: form
		});
	}

	createGroup(user, ministrieId, title) {
		const url = this._getUrl(`grupo`);
		const form = { "ministerioId": ministrieId, "titulo": title };
		return axios(url, {
			method: 'POST',
			auth: user,
			data: form
		});
	}

	getLeadership(user) {
		const url = this._getUrl(`lideranca`);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	savePhoto(user, memberId, file) {
		const url = this._getUrl(`membro/photo/${memberId}`);
		const formData = new FormData();
		formData.append("photo", file);
		return axios(url, {
			method: 'POST',
			auth: user,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	}

	_getUrl(url) {
		return `${Paths.API_ADTIMBO_PROD}/${url}`;
	}

}

export default new HttpService();