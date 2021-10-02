import { makeAutoObservable, runInAction } from 'mobx';
import {
  FAIL_PROFILE_AVATAR_UPDATE,
  FAIL_PROFILE_COVER_UPDATE,
} from '../../../common/string-template/string-template';
import User from '../model/user';
import userRepository from '../repository/user-repository';

type Error = {
  code: number;
};

type State = 'Pending' | 'Done';

export default class UserStore {
  user: User | null = null;

  error?: Error;

  meState: State = 'Done';

  updateState: State = 'Done';

  constructor() {
    makeAutoObservable(this);
  }

  async me() {
    this.meState = 'Pending';
    const res = await userRepository.me();
    const { userId, nickname, email, avatar, cover, gender, birthday } =
      res.data;
    this.user = new User(
      userId,
      nickname,
      email,
      avatar,
      cover,
      gender,
      birthday,
    );
    this.meState = 'Done';
  }

  async update(user: User) {
    this.updateState = 'Pending';
    const res = await userRepository.update(user);
    if (res.status === 200) {
      const { userId, nickname, email, avatar, cover, gender, birthday } =
        res.data;
      runInAction(() => {
        this.user = new User(
          userId,
          nickname,
          email,
          avatar,
          cover,
          gender,
          birthday,
        );
      });
    } else {
      this.error = { code: res.status };
    }
    this.updateState = 'Done';
  }

  async updateAvatar(newAvatar: FormData) {
    const res = await userRepository.updateAvatar(newAvatar);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error(FAIL_PROFILE_AVATAR_UPDATE);
  }

  async updateCover(newCover: FormData) {
    const res = await userRepository.updateCover(newCover);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error(FAIL_PROFILE_COVER_UPDATE);
  }

  async coverModify(user: User) {
    this.updateState = 'Pending';
    const res = await userRepository.coverModify(user);
    if (res.status === 200) {
      const { userId, nickname, email, avatar, cover, gender, birthday } =
        res.data;
      runInAction(() => {
        this.user = new User(
          userId,
          nickname,
          email,
          avatar,
          cover,
          gender,
          birthday,
        );
      });
    } else {
      this.error = { code: res.status };
    }
    this.updateState = 'Done';
  }
}
