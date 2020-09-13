import api from './api';

export default async function checksIfTokenIsValid() {
  api
    .get('authcheck', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('proffy-token')}`,
      },
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}
