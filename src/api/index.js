import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://139.196.141.151:83/",
  // baseURL:"http://139.196.141.151:83/",
});

export function data(id) {
  return axios.get("/data/" + id).then((p) => {
    if (p.data.length > 0) {
      return p.data[0];
    }

    return null;
  });
}

export function history(id, begin, end) {
  return axios
    .get(`/history/${id}?start=${begin}&end=${end}`)
    .then((p) => p.data);
}

export function switches(data) {
  return axios.post("/switches", data);
}
