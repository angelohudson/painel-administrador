import axios from 'axios';
import httpHandler from 'react-http-client';
import Paths from 'constants/paths.js';

class HttpService {

	login(userName, password) {
		const url = this._getAuthUrl('login');
		const params = new URLSearchParams();
		params.append('userName', userName);
		params.append('password', password);
		return axios.post(url, params, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
	}

	getMe(user) {
		const url = this._getUrl('auth/me');
		return axios.get(url, { headers: { 'Authorization': user } });
	}

	updateMember(user, member, id) {
		const url = this._getUrl(`membro/${id}`);
		return axios.put(url, member, {
			headers: { 'Authorization': user },
		});
	}

	saveMember(user, member) {
		const url = this._getUrl('membro');
		return axios.post(url, member, {
			headers: { 'Authorization': user },
		});
	}

	findCep(cep) {
		const url = `http://viacep.com.br/ws/${cep}/json/`
		return axios.get(url, {
		});
	}

	getMinistries(user) {
		const url = this._getUrl('ministerio');
		return axios.get(url, {
			headers: { 'Authorization': user, 'Access-Control-Allow-Origin': '*' }
		});
	}

	getGroups(user, ministrieId) {
		const url = this._getUrl(`grupo/${ministrieId}`);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getFunctions(user, ministrieId) {
		const url = this._getUrl(`funcao/titulo/${ministrieId}`);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMembers(user, ministrieId) {
		const url = this._getUrl(`membro/by-ministerio/${ministrieId}`);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMember(user, memberId) {
		const url = this._getUrl(`membro/${memberId}`);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMembersByGroup(user, groupId) {
		const url = this._getUrl(`membro/by-grupo/${groupId}`);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}


	getMembersByFunction(user, functionId) {
		const url = this._getUrl(`funcao/${functionId}`);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMembersNotAssociate(user, ministrieId) {
		const url = this._getUrl(`membro/ministerio-not-associate/` + ministrieId);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMembersNotAssociateOnGroup(user, ministerId, groupId) {
		const url = this._getUrl(`membro/grupo-not-associate/` + ministerId + '/' + groupId);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMembersNotAssociateOnFunction(user, ministerId, funcaoTipoId) {
		const url = this._getUrl(`membro/not-associate/` + ministerId + '/' + funcaoTipoId);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	associateMembers(user, members, ministrieId) {
		const url = this._getUrl(`ministerio/associa-membro`);
		const form = { "membros": members, "ministerioId": ministrieId };
		return axios.post(url, form, {
			headers: { 'Authorization': user },
		});
	}

	associateMembersOnGroup(user, members, groupId) {
		const url = this._getUrl(`grupo/associa-membro`);
		const form = { "membros": members, "grupoId": groupId };
		return axios.post(url, form, {
			headers: { 'Authorization': user },
		});
	}

	associateMembersOnFunction(user, members, groupId) {
		const url = this._getUrl(`funcao/associa-membro`);
		const form = { "membros": members, "funcaoTituloId": groupId };
		return axios.post(url, form, {
			headers: { 'Authorization': user },
		});
	}

	removeMemberOnMinistry(user, memberId, ministryId) {
		const url = this._getUrl(`ministerio/remove-membro/` + ministryId + "/" + memberId);
		return axios.delete(url, {
			headers: { 'Authorization': user },
		});
	}

	removeMemberOnLeadership(user, leadershipId) {
		const url = this._getUrl(`lideranca/${leadershipId}`);
		return axios.delete(url, {
			headers: { 'Authorization': user },
		});
	}

	removeMembersOnGroup(user, members, groupId) {
		const url = this._getUrl(`grupo/remove-membro`);
		const form = { "membros": members, "grupoId": groupId };
		return axios(url, {
			method: 'DELETE',
			headers: { 'Authorization': user },
			data: form
		});
	}

	removeMembersOnFunction(user, members, funcaoId) {
		const url = this._getUrl(`funcao/remove-membro`);
		const form = { "membros": members, "funcaoTituloId": funcaoId };
		return axios(url, {
			method: 'DELETE',
			headers: { 'Authorization': user },
			data: form
		});
	}

	createGroup(user, ministrieId, title) {
		const url = this._getUrl(`grupo`);
		const form = { "ministerioId": ministrieId, "titulo": title };
		return axios.post(url, form, {
			headers: { 'Authorization': user },
		});
	}

	createFunction(user, ministrieId, title) {
		const url = this._getUrl(`funcao`);
		const form = { "ministerioId": ministrieId, "titulo": title };
		return axios.post(url, form, {
			headers: { 'Authorization': user },
		});
	}

	getLeadership(user, ministrieId) {
		const url = this._getUrl(`lideranca/` + ministrieId);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	getMembersNotAssociateWithLeadership(user, ministrieId) {
		const url = this._getUrl(`membro/lideranca-not-associate/` + ministrieId);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	associateLeadership(user, leaders, ministrieId) {
		const url = this._getUrl(`lideranca`);
		const form = { "ministerioId": ministrieId, "membros": leaders };
		return axios.post(url, form, {
			headers: { 'Authorization': user },
		});
	}

	savePhoto(user, memberId, file) {
		const url = this._getUrl(`membro/photo/${memberId}`);
		const formData = new FormData();
		formData.append("photo", file);
		return axios.post(url, formData, {
			headers: {
				'Authorization': user,
				'Content-Type': 'multipart/form-data',
			}
		});
	}

	addActivitiesByGroup(user, grupoId, activity) {
		const url = this._getTaskUrl(`task/by-grupo/` + grupoId);
		return axios.post(url, activity, {
			headers: { 'Authorization': user },
		});
	}

	addActivities(user, ministrieId, activity) {
		const url = this._getTaskUrl(`task/by-ministerio/` + ministrieId);
		return axios.post(url, activity, {
			headers: { 'Authorization': user },
		});
	}

	addSchedule(user, ministrieId, schedules) {
		const url = this._getTaskUrl(`task/by-escala/` + ministrieId);
		return axios.post(url, schedules, {
			headers: { 'Authorization': user },
		});
	}

	getEvents(user, ministrieId, startDate, endDate) {
		const url = this._getTaskUrl(`evento/by-periodo/` + ministrieId + '?dataInicio=' + startDate + '&dataFim=' + endDate);
		console.log(url);
		return axios.get(url, {
			headers: { 'Authorization': user },
		});
	}

	getActivitiesByPeriod(user, ministrieId, startDate, endDate) {
		const url = this._getTaskUrl(`task/by-periodo/` + ministrieId + '?dataInicio=' + startDate + '&dataFim=' + endDate);
		return axios.get(url, {
			headers: { 'Authorization': user }
		});
	}

	_getUrl(url) {
		return `${Paths.API_ADTIMBO_PROD}/${url}`;
	}

	_getTaskUrl(url) {
		return `${Paths.API_TASK_ADTIMBO_PROD}/${url}`;
	}

	_getAuthUrl(url) {
		return `${Paths.API_AUTH_ADTIMBO_PROD}/${url}`;
	}

}

export default new HttpService();