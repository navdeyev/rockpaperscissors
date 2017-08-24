const settings = [
	{id: 1, image: 'rock', losesTo: [2]},
	{id: 2, image: 'paper', losesTo: [3]},
	{id: 3, image: 'scissors', losesTo: [1]}
];

// The game is easily extended to The Rock-Paper-Scissors-Lizard-Spock version
// const settings = [
// 	{id: 1, image: 'rock', losesTo: [2, 5]},
// 	{id: 2, image: 'paper', losesTo: [3, 4]},
// 	{id: 3, image: 'scissors', losesTo: [1, 5]},
// 	{id: 4, image: 'lizard', losesTo: [1, 3]},
// 	{id: 5, image: 'spock', losesTo: [2, 4]},
// ];

export const resultStates = {
	UNDETERMINED: 'UNDETERMINED',
	DRAW: 'DRAW',
	FIRST_PLAYER_WON: 'FIRST_PLAYER_WON',
	SECOND_PLAYER_WON: 'SECOND_PLAYER_WON',
};

export const getResultState = (firstSelection, secondSelection) => {
	if (firstSelection === null || firstSelection === undefined
		|| secondSelection === null || firstSelection === undefined) {
		return resultStates.UNDETERMINED;
	}

	if (firstSelection === secondSelection) {
		return resultStates.DRAW;
	}

	const firstSelectionItem = settings.find((item) => item.id === firstSelection);
	return firstSelectionItem.losesTo.includes(secondSelection)
		? resultStates.SECOND_PLAYER_WON
		: resultStates.FIRST_PLAYER_WON
};

//Used to generate a random number, that will match one of the ids in settings array
export const generateSelection = () => {
	return Math.floor((Math.random() * settings.length) + 1);
};

export default settings;
