import {initState} from '../reducers/index';
import CONFIG_GAME from '../../configGame';

export const INITIAL_STATE = {
  level: 0,
  lives: CONFIG_GAME.MAX_LIVES,
  answers: [],
};

const state = initState(INITIAL_STATE);

export default state;
