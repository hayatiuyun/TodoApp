/* eslint-disable prettier/prettier */
import axios from 'axios';
const API = axios.create({
  baseURL: 'https://todoapp-reactnative.herokuapp.com/',
});

export const getTodoPage = page => API.get('/ToDo/' + page);
export const getTodo = () => API.get('/ToDo');
export const postTodo = data => API.post('/ToDo', data);
export const editTodo = data => API.put('/ToDo/' + data._id, data);
export const deleteTodo = data => API.delete('/ToDo/' + data._id);
