const axios = require('axios').default;

const example_get_1 = ({ url, port }) => {
  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/test",
    headers: { Accept: "application/json" },
  })
}

const example_post_1 = ({url, port, payload}) => {
  return axios.request({
    method: "POST",
    baseURL: `${url}:${port}`,
    url: "/test",
    body: JSON.stringify(payload),
    headers: { Accept: "application/json" },
  })
}


module.exports.example_get_1 = example_get_1;
module.exports.example_post_1 = example_post_1;
