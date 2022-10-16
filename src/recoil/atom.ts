import { atom } from 'recoil';
import { DefaultType } from 'types';

export const globalState = atom<DefaultType[]>({
  key: 'globalState',
  default: [],
});

export default globalState;
