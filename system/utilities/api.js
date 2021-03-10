import Axios from 'axios';

class API {

    async get(url) {
        const resp = await Axios(
            {
                method: 'get',
                url: url
            }
        );

        return {
            status: resp.status,
            data: resp.data
        }
    }

}

export default new API