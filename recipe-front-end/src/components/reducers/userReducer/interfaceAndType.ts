import * as types from './types';

interface actionTypeAdd {
  type: typeof types.addUser;
  payload: {
    name?: string,
    email?: string,
    id?: number,
    loading: boolean
  }
}

interface actionTypeRemove {
  type: typeof types.removeUser;
}

interface actionTypeLoading {
  type: typeof types.loadingUser;
}
interface actionTypeNotLoading {
  type: typeof types.notLoading;
}

type actionType = actionTypeAdd | actionTypeRemove | actionTypeLoading | actionTypeNotLoading;

export type { actionType}