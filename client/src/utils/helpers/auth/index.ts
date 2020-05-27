import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LoginFormType, RegisterFormType } from '../../types';

export function setAuthorizationToken(token: string) {
  if (token.length) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function register(inputs: RegisterFormType) {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, inputs)
    .catch((err) => 'invalid');
}

export function logout() {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken('');
  return null;
}

export function login(data: LoginFormType) {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, data)
    .then((res) => {
      const token = res.data.token;

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      return jwtDecode(token);
    })
    .catch((err) => 'invalid');
}
