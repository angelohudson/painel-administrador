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

	getMe(user) {
		const url = this._getUrl('auth/me');
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

	getFunctions(user, ministrieId) {
		const url = this._getUrl(`funcao/titulo/${ministrieId}`);
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

	getMembersByGroup(user, groupId) {
		const url = this._getUrl(`membro/by-grupo/${groupId}`);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}


	getMembersByFunction(user, functionId) {
		const url = this._getUrl(`funcao/${functionId}`);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getMembersNotAssociate(user, ministrieId) {
		const url = this._getUrl(`membro/ministerio-not-associate/` + ministrieId);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getMembersNotAssociateOnGroup(user, ministerId, groupId) {
		const url = this._getUrl(`membro/grupo-not-associate/` + ministerId + '/' + groupId);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getMembersNotAssociateOnFunction(user, ministerId, funcaoTipoId) {
		const url = this._getUrl(`membro/not-associate/` + ministerId + '/' + funcaoTipoId);
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

	associateMembersOnGroup(user, members, groupId) {
		const url = this._getUrl(`grupo/associa-membro`);
		const form = { "membros": members, "grupoId": groupId };
		return axios(url, {
			method: 'POST',
			auth: user,
			data: form
		});
	}

	associateMembersOnFunction(user, members, groupId) {
		const url = this._getUrl(`funcao/associa-membro`);
		const form = { "membros": members, "funcaoTituloId": groupId };
		return axios(url, {
			method: 'POST',
			auth: user,
			data: form
		});
	}

	removeMemberOnMinistry(user, memberId, ministryId) {
		const url = this._getUrl(`ministerio/remove-membro/` + ministryId + "/" + memberId);
		return axios(url, {
			method: 'DELETE',
			auth: user,
		});
	}

	removeMemberOnLeadership(user, leadershipId) {
		const url = this._getUrl(`lideranca/${leadershipId}`);
		return axios(url, {
			method: 'DELETE',
			auth: user,
		});
	}

	removeMembersOnGroup(user, members, groupId) {
		const url = this._getUrl(`grupo/remove-membro`);
		const form = { "membros": members, "grupoId": groupId };
		return axios(url, {
			method: 'DELETE',
			auth: user,
			data: form
		});
	}

	removeMembersOnFunction(user, members, funcaoId) {
		const url = this._getUrl(`funcao/remove-membro`);
		const form = { "membros": members, "funcaoTituloId": funcaoId };
		return axios(url, {
			method: 'DELETE',
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

	createFunction(user, ministrieId, title) {
		const url = this._getUrl(`funcao`);
		const form = { "ministerioId": ministrieId, "titulo": title };
		return axios(url, {
			method: 'POST',
			auth: user,
			data: form
		});
	}

	getLeadership(user, ministrieId) {
		const url = this._getUrl(`lideranca/` + ministrieId);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	getMembersNotAssociateWithLeadership(user, ministrieId) {
		const url = this._getUrl(`membro/lideranca-not-associate/` + ministrieId);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	associateLeadership(user, leaders, ministrieId) {
		const url = this._getUrl(`lideranca`);
		const form = { "ministerioId": ministrieId, "membros": leaders };
		return axios(url, {
			method: 'POST',
			auth: user,
			data: form
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

	addActivitiesByGroup(user, grupoId, activity) {
		const url = this._getUrl(`task/by-grupo/` + grupoId);
		return axios(url, {
			method: 'POST',
			auth: user,
			data: activity
		});
	}

	addActivities(user, ministrieId, activity) {
		const url = this._getUrl(`task/by-ministerio/` + ministrieId);
		return axios(url, {
			method: 'POST',
			auth: user,
			data: activity
		});
	}

	addSchedule(user, ministrieId, schedules) {
		const url = this._getUrl(`task/by-escala/` + ministrieId);
		return axios(url, {
			method: 'POST',
			auth: user,
			data: schedules
		});
	}

	getEvents(user, ministrieId, startDate, endDate) {
		const url = this._getUrl(`evento/by-periodo/` + ministrieId + '?dataInicio=' + startDate + '&dataFim=' + endDate);
		console.log(url);
		return axios(url, {
			method: 'GET',
			auth: user,
		});
	}

	getActivitiesByPeriod(user, ministrieId, startDate, endDate) {
		const url = this._getUrl(`task/by-periodo/` + ministrieId + '?dataInicio=' + startDate + '&dataFim=' + endDate);
		return axios(url, {
			method: 'GET',
			auth: user
		});
	}

	_getUrl(url) {
		return `${Paths.API_ADTIMBO_PROD}/${url}`;
	}

}

export default new HttpService();