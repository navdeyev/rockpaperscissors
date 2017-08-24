import {assert} from 'chai';

import actions from '../../src/js/dashboard/dashboardActions';
import {firstPlayerSelection, secondPlayerSelection} from '../../src/js/dashboard/dashboardReducers';

describe('firstPlayerSelection', () => {

	it('returns null by default', () => {
		assert.isNull(firstPlayerSelection(undefined, {}));
	});

	it('returns action.payload on FIRST_PLAYER_CHOICE_MADE', () => {
		const action = {type: actions.FIRST_PLAYER_CHOICE_MADE, payload: 1};
		assert.equal(firstPlayerSelection(undefined, action), 1);
	});

	it('returns null on RESET_SELECTIONS', () => {
		const action = {type: actions.RESET_SELECTIONS, payload: 1};
		assert.isNull(firstPlayerSelection(1, action));
	});

});

describe('secondPlayerSelection', () => {

	it('returns null by default', () => {
		assert.isNull(secondPlayerSelection(undefined, {}));
	});

	it('returns action.payload on SECOND_PLAYER_CHOICE_MADE', () => {
		const action = {type: actions.SECOND_PLAYER_CHOICE_MADE, payload: 2};
		assert.equal(secondPlayerSelection(undefined, action), 2);
	});

	it('returns null on RESET_SELECTIONS', () => {
		const action = {type: actions.RESET_SELECTIONS, payload: 1};
		assert.isNull(secondPlayerSelection(2, action));
	});

});
