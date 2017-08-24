const actions = {
	FIRST_PLAYER_CHOICE_MADE: 'FIRST_PLAYER_CHOICE_MADE',
	SECOND_PLAYER_CHOICE_MADE: 'SECOND_PLAYER_CHOICE_MADE',
	RESET_SELECTIONS: 'RESET_SELECTIONS'
};

export const makeFirstPlayerSelection = (selection) => {
	return {type: actions.FIRST_PLAYER_CHOICE_MADE, payload: selection};
};

export const makeSecondPlayerSelection = (selection) => {
	return {type: actions.SECOND_PLAYER_CHOICE_MADE, payload: selection};
};

export const resetSelections = () => {
	return { type: actions.RESET_SELECTIONS };
};

export default actions;
