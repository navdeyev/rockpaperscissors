import {combineReducers} from 'redux';
import actions from './dashboardActions';

export const firstPlayerSelection = (state = null, action) => {
	switch (action.type) {
		case actions.FIRST_PLAYER_CHOICE_MADE:
			return action.payload;
		case actions.RESET_SELECTIONS:
			return null;
		default:
			return state;
	}
};

export const secondPlayerSelection = (state = null, action) => {
	switch (action.type) {
		case actions.SECOND_PLAYER_CHOICE_MADE:
			return action.payload;
		case actions.RESET_SELECTIONS:
			return null;
		default:
			return state;
	}
};

const game = combineReducers({
	firstPlayerSelection,
	secondPlayerSelection
});

export default game;
