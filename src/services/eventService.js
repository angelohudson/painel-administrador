import axios from "axios";
import Paths from "constants/paths";

class EventService {

    updateEvent(user, ministrieId, schedules, id) {
        const url = this._getUrl(`evento/${id}` + ministrieId);
        return axios(url, {
            method: 'PUT',
            auth: user,
            data: schedules
        });
    }

    deleteEvent(user, id) {
        const url = this._getUrl(`evento/${id}`);
        return axios(url, {
            method: 'DELETE',
            auth: user
        });
    }

    findEvent(user, id) {
        const url = this._getUrl(`evento/${id}`);
        return axios(url, {
            method: 'GET',
            auth: user
        });
    }

    _getUrl(url) {
        return `${Paths.API_ADTIMBO_PROD}/${url}`;
    }
}

export default new EventService();