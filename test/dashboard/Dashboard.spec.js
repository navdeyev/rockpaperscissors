import React from 'react';
import {assert} from 'chai';
import sinon from 'sinon';
import {shallow} from 'enzyme';

import {Dashboard} from '../../src/js/dashboard/Dashboard';
import {resultStates} from '../../src/js/settings';

describe('Dashboard', () => {

	let props;
	const makeFirstPlayerSelection = sinon.spy();
	const makeSecondPlayerSelection = sinon.spy();
	const resetSelections = sinon.spy();
	beforeEach(() => {
		props = {
			makeFirstPlayerSelection,
			makeSecondPlayerSelection,
			resetSelections,
			resultState: resultStates.UNDETERMINED
		};
	});

	afterEach(() => {
		makeFirstPlayerSelection.reset();
		makeSecondPlayerSelection.reset();
		resetSelections.reset()
	});

	it('has no winning marker if resultState is UNDETERMINED', () => {
		const wrapper = shallow(<Dashboard {...props} />);
		assert.isFalse(wrapper.find('.win').exists());
	});

	it('marks first player as a winner if resultState is FIRST_PLAYER_WON', () => {
		props.resultState = resultStates.FIRST_PLAYER_WON;

		const wrapper = shallow(<Dashboard {...props} />);
		assert.isTrue(wrapper.find('[data-role="firstPlayer"]').hasClass('win'));
	});

	it('marks second player as a winner if resultState is SECOND_PLAYER_WON', () => {
		props.resultState = resultStates.SECOND_PLAYER_WON;

		const wrapper = shallow(<Dashboard {...props} />);
		assert.isTrue(wrapper.find('[data-role="secondPlayer"]').hasClass('win'));
	});

	it('marks resetStateButton as disabled if resultState is UNDETERMINED', () => {
		const wrapper = shallow(<Dashboard {...props} />);
		const resetStateButton = wrapper.find('[data-role="resetStateButton"]');
		assert.isTrue(resetStateButton.props().disabled);
	});

	const nonUndeterminedStates = Object.keys(resultStates).filter((key) => key !== resultStates.UNDETERMINED);
	nonUndeterminedStates.forEach((resultState) => {
		it(`marks resetStateButton as enabled if resultState is ${ resultState }`, () => {
			props.resultState = resultState;
			const wrapper = shallow(<Dashboard {...props} />);
			const resetStateButton = wrapper.find('[data-role="resetStateButton"]');
			assert.isFalse(resetStateButton.props().disabled);
		});
	});

	it('marks simulateButton as enabled if resultState is UNDETERMINED', () => {
		const wrapper = shallow(<Dashboard {...props} />);
		const resetStateButton = wrapper.find('[data-role="simulateButton"]');
		assert.isFalse(resetStateButton.props().disabled);
	});

	nonUndeterminedStates.forEach((resultState) => {
		it(`marks simulateButton as disabled if resultState is ${ resultState }`, () => {
			props.resultState = resultState;
			const wrapper = shallow(<Dashboard {...props} />);
			const resetStateButton = wrapper.find('[data-role="simulateButton"]');
			assert.isTrue(resetStateButton.props().disabled);
		});
	});

	it('executes resetSelections if resetStateButton is clicked', () => {
		props.resultState = resultStates.FIRST_PLAYER_WON;

		const wrapper = shallow(<Dashboard {...props} />);
		const resetStateButton = wrapper.find('[data-role="resetStateButton"]');
		resetStateButton.simulate('click');
		assert.isTrue(resetSelections.calledOnce);
	});

	it('executes both selection actions if simulate button is clicked', () => {
		const wrapper = shallow(<Dashboard {...props} />);
		const resetStateButton = wrapper.find('[data-role="simulateButton"]');
		resetStateButton.simulate('click');
		assert.isTrue(makeFirstPlayerSelection.calledOnce);
		assert.isTrue(makeSecondPlayerSelection.calledOnce);
	});

	it('it calls makeFirstPlayerSelection when firstPlayerIconPanel fires onChange', () => {
		const wrapper = shallow(<Dashboard {...props} />);
		const firstPlayerIconPanel = wrapper.find('[data-role="firstPlayerIconPanel"]');
		firstPlayerIconPanel.props().onChange(1);
		assert.isTrue(makeFirstPlayerSelection.calledWith(1));
	});

	it('it calls both selections when secondPlayerIconPanel fires onChange', () => {
		const wrapper = shallow(<Dashboard {...props} />);
		const firstPlayerIconPanel = wrapper.find('[data-role="secondPlayerIconPanel"]');
		firstPlayerIconPanel.props().onChange(1);
		assert.isTrue(makeSecondPlayerSelection.calledWith(1));
		assert.isTrue(makeFirstPlayerSelection.calledOnce);
	});

});
