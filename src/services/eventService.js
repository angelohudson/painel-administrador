import axios from "axios";
import Paths from "constants/paths";

class EventService {
    deleteEvent(user, id) {
        const url = this._getUrl(`evento/${id}`);
        return axios(url, {
            method: 'DELETE',
            auth: user
        });
    }

    _getUrl(url) {
        return `${Paths.API_ADTIMBO_PROD}/${url}`;
    }
}

export default new EventService();