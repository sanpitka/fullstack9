import axios from 'axios';
import { Diary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(baseUrl);
  return data;
};

const create = async (newObject: Omit<Diary, 'id'>) => {
  const { data } = await axios.post<Diary>(baseUrl, newObject);
  return data;
};

export default { getAll, create };