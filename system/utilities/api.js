// TODO: Replace axios dependency with built in HTTP/HTTPS module
import Axios from 'axios';

class API {

    async get(url) {
        const resp = await Axios(
            {
                method: 'get',
                url: url
            }
        );

        return _format(resp);
    }

    async post(url, headers, json) {
        const resp = await Axios(
            {
                method: 'post',
                url: url,
                headers: headers,
                data: json
            }
        );

        return _format(resp);
    }

}

function _format(response) {
    return {
        data: response.data,
        headers: response.headers,
        status: response.status
    }
}

export default new API