import { atom } from 'recoil';
import { DefaultType } from '../types';

export const results = atom<DefaultType[]>({
  key: 'results',
  default: [],
});

export default results;
