import { UserType } from '../../utils/types';
import { ACTION_TYPES } from '../';

export const addUser = (user: UserType | null) => ({
  type: ACTION_TYPES.addUser,
  payload: { user: user || null },
});
