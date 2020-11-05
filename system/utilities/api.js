import fetch from 'node-fetch';

class API {

    get(url, headers = {}) {
        let response;
        _get(url, headers).then(result => console.log(result));
        return response;
    }

    /**
     * Make a request to an API endpoint
     * @param {('GET'||'POST'||'DELETE'||'PUT')} method - API request method
     * @param {string} url - URL endpoint to send request
     * @param {object=} header 
     * @param {object=} body 
     */
    request(method, url, headers = {'Content-Type': 'application/json'}, body = {}) {
        fetch(
            url, 
            {
                method: method,
                headers: headers,
            }
        )
        .then((res) => {
            return res;
        });
    }

}

async function _get(url, headers) {
    let response = {statusCode: '', body: ''};

    const res = await fetch(
        url,
        {
            method: 'GET',
            headers: headers,
        }
    );

    if(await res.headers.get('Content-Type').includes('json')) {
        response.body = await res.json();
    } else {
        response.body = await res.text();
    }

    response.statusCode = res.status;
    console.log(response.body);
    return response;
}

export default new API