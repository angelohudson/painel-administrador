import axios from 'axios';
import UserService from 'services/userService';
import { NotificationManager } from 'react-notifications';

axios.interceptors.response.use(response => {
	return response;
}, error => {
	const { response } = error;

	if (response && response.status === 401) {
		NotificationManager.warning('Credenciais inválidas');
		UserService.logout();
	} else if (response && response.status === 403) {
		NotificationManager.warning('Usuário sem permissões');
	} else if (!axios.isCancel(error)) {
		NotificationManager.error('Contate o Administrador');
	}

	return Promise.reject(error);
})