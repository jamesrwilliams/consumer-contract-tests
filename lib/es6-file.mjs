/* This file uses import/export module syntax and normal Mocha can't handle that.. */
import axios from "axios";

const an_exported_function = ({ url, port }) => {
  // Make arbitrary network call for the contract service to catch.
  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/test",
    headers: { Accept: "application/json" },
  })
}

export const another_exported_function = ({ url, port }) => {
  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/test",
    headers: { Accept: "application/json" },
  })
}

export default an_exported_function;
