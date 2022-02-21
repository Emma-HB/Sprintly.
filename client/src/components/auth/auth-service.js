import axios from 'axios';

const service = axios.create({
  baseURL:`${process.env.REACT_APP_APIURL || ""}/api`,
  withCredentials: true
});
export default service;

function signup(username, password, email) {
  return service.post('/users', {username, password, email}).then(response => response.data)
}
export {signup}

function loggedin() {
  return service.get('/session').then(response => response.data)
}
export {loggedin}

function login(email, password) {
  return service.post('/sessions', {email, password}).then(response => response.data)
}
export {login}
 
function logout() {
  return service.delete('/session', {}).then(response => response.data)
}
export {logout}