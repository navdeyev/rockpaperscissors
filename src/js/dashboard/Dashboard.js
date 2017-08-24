import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Header from '../components/Header';

import IconPanel from '../components/IconPanel';

import settings, {generateSelection, getResultState, resultStates} from '../settings';
import {makeFirstPlayerSelection, makeSecondPlayerSelection, resetSelections} from './dashboardActions';

import './Dashboard.scss';

export const Dashboard = (props) => {
	const {
		firstPlayerSelection,
		secondPlayerSelection,
		makeFirstPlayerSelection,
		makeSecondPlayerSelection,
		resetSelections,
		resultState
	} = props;

	const playerSelectionChangeHandler = (selection) => {
		makeSecondPlayerSelection(selection);
		makeFirstPlayerSelection(generateSelection());
	};

	const simulateClickHandler = () => {
		makeFirstPlayerSelection(generateSelection());
		makeSecondPlayerSelection(generateSelection());
	};

	return (
		<div className="main">
			<Header/>

			<div className="container">
				<div className="comment">
					Let the epic battle of man vs machine begin!<br/>Make your selection!
				</div>
				<div className="content">
					<div className="left">
						<div data-role="firstPlayer" className={`player ${ resultState === resultStates.FIRST_PLAYER_WON ? 'win' : '' }`}>
							<div className="playerName">Deep Blue</div>
							<IconPanel data-role="firstPlayerIconPanel" disabled options={settings} selectedId={firstPlayerSelection} onChange={makeFirstPlayerSelection}/>
						</div>
					</div>

					<div className="right">
						<div data-role="secondPlayer" className={`player ${ resultState === resultStates.SECOND_PLAYER_WON ? 'win' : '' }`}>
							<div className="playerName">Player</div>
							<IconPanel data-role="secondPlayerIconPanel" options={settings} selectedId={secondPlayerSelection} onChange={playerSelectionChangeHandler}/>
						</div>
					</div>
				</div>
			</div>

			<div className="actions">
				<button type="button"
						className="btn"
						data-role="resetStateButton"
						onClick={resetSelections}
						disabled={resultState === resultStates.UNDETERMINED}>
					Wanna try again?
				</button>

				<button type="button"
						className="btn"
						data-role="simulateButton"
						onClick={simulateClickHandler}
						disabled={resultState !== resultStates.UNDETERMINED}>
					Simulate a game
				</button>
			</div>
		</div>
	);
};

Dashboard.propTypes = {
	firstPlayerSelection: PropTypes.number,
	secondPlayerSelection: PropTypes.number,
	makeFirstPlayerSelection: PropTypes.func.isRequired,
	makeSecondPlayerSelection: PropTypes.func.isRequired,
	resetSelections: PropTypes.func.isRequired,
	resultState: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	return {
		firstPlayerSelection: state.firstPlayerSelection,
		secondPlayerSelection: state.secondPlayerSelection,
		resultState: getResultState(state.firstPlayerSelection, state.secondPlayerSelection)
	};
};

const mapDispatchToProps = {
	makeFirstPlayerSelection: makeFirstPlayerSelection,
	makeSecondPlayerSelection: makeSecondPlayerSelection,
	resetSelections: resetSelections
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
