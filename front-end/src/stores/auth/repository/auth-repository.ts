import { mainAxios } from '../../../libs/axios';

class AuthRepository {
  constructor(private readonly url: string) {}

  signin(authCode: string) {
    return mainAxios.get(`${this.url}/oauth/login?code=${authCode}`);
  }
}

export default new AuthRepository(process.env.REACT_APP_API_DOMAIN_URL!);
