import {assert} from 'chai';

import actions, {
	makeFirstPlayerSelection,
	makeSecondPlayerSelection,
	resetSelections
} from '../../src/js/dashboard/dashboardActions';

describe('actions', () => {

	it('makeFirstPlayerSelection dispatches FIRST_PLAYER_CHOICE_MADE action', () => {
		assert.deepEqual(
			makeFirstPlayerSelection(1),
			{type: actions.FIRST_PLAYER_CHOICE_MADE, payload: 1}
		);
	});

	it('makeSecondPlayerSelection dispatches SECOND_PLAYER_CHOICE_MADE action', () => {
		assert.deepEqual(
			makeSecondPlayerSelection(2),
			{type: actions.SECOND_PLAYER_CHOICE_MADE, payload: 2}
		);
	});

	it('resetSelections dispatches RESET_SELECTIONS action', () => {
		assert.deepEqual(
			resetSelections(),
			{type: actions.RESET_SELECTIONS}
		);
	});

});
