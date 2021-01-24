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

	_getUrl(url) {
		return `${Paths.API_ADTIMBO_PROD}/${url}`;
	}
}

export default new HttpService();