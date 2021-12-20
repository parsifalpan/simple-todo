import {makeAutoObservable} from 'mobx'

import provider from '../utils/provider';

import {IUser} from '../constant/Interface';
import {AxiosResponse} from "axios";

type LoginForm = {
  username: string;
  password: string;
}

export class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: IUser | null = null;
  loading: boolean = false;

  get nickname(): string {
    if (this.user?.first_name && this.user?.last_name) return `${this.user.first_name} ${this.user.last_name}`;
    return this.user?.username || 'anonymous';
  }

  getUser = async () => {
    return provider.getInstance().get('/account/user/')
      .then((response: AxiosResponse) => {
        this.user = response.data;
        Promise.resolve(response);
      })
      .catch(err => {
        this.user = null;
        throw err;
      });
  };

  simpleLogin = async (loginForm: LoginForm) => {
    return provider.getInstance().post('/account/login/', loginForm)
      .then(res => {
        this.getUser();
        Promise.resolve(res);
      })
  };

  googleAuth = async (loginForm: { id_token: string }) => {
    return provider.getInstance().post('/account/google_auth/', loginForm)
      .then(res => {
        this.getUser();
        Promise.resolve(res);
      })
  };

  logout = async () => {
    return provider.getInstance().post('/account/logout/')
      .then(res => {
        this.user = null;
        Promise.resolve(res);
      })
  };

  register = async (loginForm: LoginForm) => {
    return provider.getInstance().post('/account/register/', loginForm)
      .then(res => {
        this.getUser();
        Promise.resolve(res);
      })
  };

  updateProfile = async (profile: Partial<IUser>) => {
    return provider.getInstance().post('/account/edit_profile/', profile)
      .then(res => {
        this.getUser();
        Promise.resolve(res);
      })
  };
}
