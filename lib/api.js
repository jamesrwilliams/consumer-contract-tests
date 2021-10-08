const axios = require("axios");
const random = require("./utils/level-1.js");

export const example_get_1 = ({ url, port }) => {
  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/test",
    headers: { Accept: "application/json" },
  })
}

/**
 * A import module target.
 * @returns {string}
 */
export const example_import = () => {
  return random();
}

export const example_post_1 = ({url, port, payload}) => {
  return axios.request({
    method: "POST",
    baseURL: `${url}:${port}`,
    url: "/test",
    body: JSON.stringify(payload),
    headers: { Accept: "application/json" },
  })
}
