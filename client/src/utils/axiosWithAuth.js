import axios from 'axios';

export const axiosWithAuth = () => {
  // returns an "instance" of axios, with preconfigured configs
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.create({
    headers: {
      Authorization: token
    },
    //baseURL: 'http://localhost:5000'
  });
};
