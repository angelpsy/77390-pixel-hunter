import {getNodesFromString} from '../utils';
import {showScreen} from './utils';
import renderNextScreen from './level';
import renderFirstScreen from './greeting';
import getGameHeader from './template-parts/game-header';
import {addAnswer, changeLevel} from '../store/reducers/index';

const TEMPLATE = `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>
`;

let _answer;

const checkIsCorrectAnswer = (state, answers) => {
  const questions = state.levels[state.level].questions;
  return questions.every((question, index) => {
    return question.answers.byId[answers[index]].isCorrect;
  });
};

const goNextScreen = (state) => {
  removeEventListeners();
  let _state;
  _state = addAnswer(state, {
    time: 15,
    isCorrect: checkIsCorrectAnswer(state, [_answer]),
  });
  _state = changeLevel(_state, state.level + 1);
  renderNextScreen(_state);
};

const goFirstScreen = (state) => {
  removeEventListeners();
  renderFirstScreen(state);
};

const handlerChangeAnswer = (state, event) => {
  _answer = event.target.value;
  goNextScreen(state);
};

const removeEventListeners = () => {
  document.querySelector(`.game__content`).removeEventListener(`change`, handlerChangeAnswer);
  document.querySelector(`.back`).removeEventListener(`click`, goFirstScreen);
};

const addEventListeners = (state) => {
  document.querySelector(`.game__content`).addEventListener(`change`, handlerChangeAnswer.bind(null, state));
  document.querySelector(`.back`).addEventListener(`click`, goFirstScreen.bind(null, state));
};

const nodes = getNodesFromString(getGameHeader() + TEMPLATE);

const render = (state) => {
  showScreen(nodes);
  addEventListeners(state);
};

export default render;
