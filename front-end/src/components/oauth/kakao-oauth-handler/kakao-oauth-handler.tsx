import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import FullLoading from '../../loading/full-loading';

const KakaoOauthHandler = () => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code == null) {
      alert('다시 시도해주세용');
    } else {
      auth
        .login(code)
        .then(() => history.push('/'))
        .catch((error) => {
          console.log(error);
          alert('다시 시도해주세용');
        });
    }
  });
  return <FullLoading />;
};

export default KakaoOauthHandler;
