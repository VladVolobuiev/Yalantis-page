import { SET_USER } from './user.types';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
