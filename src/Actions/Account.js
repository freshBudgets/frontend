import { apiPost } from '../Functions/api';

export function linkAccount(obj) {
  return dispatch => {
    return apiPost('/plaid/link', obj).then( response => {
      if (!response.success) {
        return Promise.reject('Error connecting accounts');
      }

      return Promise.resolve();
    })
  }
}
