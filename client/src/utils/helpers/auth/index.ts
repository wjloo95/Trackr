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

export async function register(inputs: RegisterFormType) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/register`,
      inputs
    );
  } catch (error) {
    return 'invalid';
  }
}

export function logout() {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken('');
  return null;
}

export async function login(data: LoginFormType) {
  try {
    const loggedInToken = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      data
    );
    const token = loggedInToken.data.token;

    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    return jwtDecode(token);
  } catch (error) {
    return 'invalid';
  }
}
