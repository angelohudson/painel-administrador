import axios from "axios";
import Paths from "constants/paths";

class EventService {

    updateEvent(user, ministrieId, schedules, id) {
        const url = this._getUrl(`evento/${id}` + ministrieId);
        return axios.put(url, schedules, {
            headers: { 'Authorization': user }
        });
    }

    deleteEvent(user, id) {
        const url = this._getUrl(`evento/${id}`);
        return axios.delete(url, {
            headers: { 'Authorization': user }
        });
    }

    findEvent(user, id) {
        const url = this._getUrl(`evento/${id}`);
        return axios.get(url, {
            headers: { 'Authorization': user }
        });
    }

    _getUrl(url) {
        return `${Paths.API_TASK_ADTIMBO_PROD}/${url}`;
    }
}

export default new EventService();