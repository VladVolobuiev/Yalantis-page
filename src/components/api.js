import * as axios from 'axios';

export const getUsers = () => {
  return axios.get(
    'https://yalantis-react-school-api.yalantis.com/api/task0/users'
  );
};
