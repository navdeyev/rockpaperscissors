import {assert} from 'chai';
import sinon from 'sinon';

import {generateSelection, getResultState, resultStates} from '../src/js/settings';

describe('getResultState', () => {

	it('returns UNDETERMINED if at least one of the selections is null or undefined', () => {
		assert.equal(getResultState(null, undefined), resultStates.UNDETERMINED);
	});

	it('returns DRAW if selections are equal', () => {
		assert.equal(getResultState(1, 1), resultStates.DRAW);
	});

	//The small amount of the combinations allows us to list all of them
	//When the amount of combinations grows, a better approach for testing those will be needed
	it('returns FIRST_PLAYER_WON if his selection is winning according to settings', () => {
		assert.equal(getResultState(2, 1), resultStates.FIRST_PLAYER_WON);
		assert.equal(getResultState(3, 2), resultStates.FIRST_PLAYER_WON);
		assert.equal(getResultState(1, 3), resultStates.FIRST_PLAYER_WON);
	});

	it('returns SECOND_PLAYER_WON if his selection is winning according to settings', () => {
		assert.equal(getResultState(1, 2), resultStates.SECOND_PLAYER_WON);
		assert.equal(getResultState(2, 3), resultStates.SECOND_PLAYER_WON);
		assert.equal(getResultState(3, 1), resultStates.SECOND_PLAYER_WON);
	});

});

describe('generateSelection', () => {

	//There is no need to test Math.random and Math.floor, but we need to know those were called
	let randomStub, floorStub;
	beforeEach(() => {
		randomStub = sinon.stub(Math, 'random').returns(0.1);
		floorStub = sinon.stub(Math, 'floor').returns(1);
	});

	afterEach(() => {
		randomStub.restore();
		floorStub.restore();
	});

	it('uses Math.random and Math.floor to generate a selection', () => {
		assert.equal(generateSelection(), 1);
		assert.isTrue(randomStub.calledOnce);
		assert.isTrue(floorStub.calledOnce);
	});

});
